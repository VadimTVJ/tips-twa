import { FastifyReply, FastifyRequest } from 'fastify';
import { initData, validate } from '@tma.js/init-data-node';
import { UserModel } from '../models/user';

export const checkLaunchParams = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const tgToken = process.env.TG_TOKEN as string;
  const paramsString = request.headers.authorization!;

  try {
    validate(paramsString, tgToken);

    const { user: tgUser } = initData.parse(paramsString);

    if (!tgUser) {
      return await reply.unauthorized();
    }

    let user = await UserModel.findOne({
      where: { tg_id: tgUser.id },
    });

    if (!user) {
      user = new UserModel();
      user.tg_id = tgUser.id;
      await user.save({ reload: true });
    } else {
      await UserModel.update(user.id, {
        update_date: () => 'CURTIME()',
      });
    }

    request.user = {
      tgId: tgUser.id,
      userId: user.id,
    };

    return true;
  } catch (error) {
    console.error(error);

    return reply.unauthorized();
  }
};

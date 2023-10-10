import { FastifyInstance } from 'fastify';
import { TipModel } from './models/tip';
import { UserModel } from './models/user';

export const botHandler = async ({ bot }: FastifyInstance) => {
  bot.on('successful_payment', async (message) => {
    try {
      const userTgId = message.from?.id;
      if (!userTgId) {
        return;
      }

      const user = await UserModel.findOneOrFail({
        where: { tg_id: userTgId },
      });

      const { waiterId, tipsAmount, currencyCode } = JSON.parse(message.successful_payment?.invoice_payload || '');
      if (!waiterId) {
        return;
      }

      const tip = new TipModel();
      tip.amount = tipsAmount;
      tip.waiter_id = waiterId;
      tip.currency = currencyCode;
      tip.user_id = user.id;
      await tip.save();
    } catch (e) {
      // ignore
    }
  });

  bot.on('pre_checkout_query', (preCheckoutQuery) => {
    bot.answerPreCheckoutQuery(preCheckoutQuery.id, true);
  });

  bot.on('message', async (msg) => {
    const qr = process.env.TG_BOT_QR_URL as string;

    if (msg.text === '/qr') {
      await bot.sendPhoto(msg.chat.id, qr);
    } else {
      const botName = process.env.TG_BOT_NAME as string;
      const appName = process.env.TG_BOT_APP_NAME as string;

      const directLink = `t.me/${botName}/${appName}`;
      const directLinkWithParam = `${directLink}?startapp=1`;

      bot.sendMessage(msg.chat.id, `
      <b>Hello, world!</b>

This is a bot to demonstrate the capabilities of the Telegram Mini Apps platform. A simple service for paying tips to a waiter.

<b>Launch the app via:</b>
1. Bot menu button
2. Direct link: <a href="${directLink}">${directLink}</a>
3. Direct link with startapp param (waiterId): <a href="${directLinkWithParam}">${directLinkWithParam}</a>
4. Inline button
      
<b>Payments via Stripe Test.</b>
Use <code>4242 4242 4242 4242</code> as card number with <i>random</i> date, CVC, zip, name etc. <a href="https://stripe.com/docs/testing?testing-method=card-numbers#cards">Stripe test cards</a>
      
<b>Available waiter IDS</b>: 1, 2, 3, 4, 5, 6, 7, 8, 9

<b>QR:</b> links with pattern ${directLink}?startapp=1, where 1 - waiterId. Send /qr to get demo QR.
      
<a href="https://github.com/VadimTVJ/tips-twa">Github repository</a>
      `, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{
            text: 'Open via inline button',
            url: 'https://t.me/Tipsdev_bot/app',
          }]],
        },
      });
    }
  });
};

import { DataSource } from 'typeorm';
import { UserModel } from './models/user';
import { TipModel } from './models/tip';
import { WaiterModel } from './models/waiter';

export const dataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    UserModel,
    TipModel,
    WaiterModel,
  ],
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
});

const DELAY = 1500;

export async function connectDatabase(retries: number): Promise<DataSource> {
  try {
    const result = await dataSource.initialize();
    console.log('Database connected!');

    return result;
  } catch (error) {
    console.error('Database error', error);

    if (retries === 0) { throw error; }

    await new Promise((resolve) => {
      setTimeout(resolve, DELAY);
    });

    return await connectDatabase(retries - 1);
  }
}

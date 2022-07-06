import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

const {
  NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const baseOption: DataSourceOptions = {
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../**/*.migration{.ts,.js}')],
};

export default registerAs('database', (): DataSourceOptions => {
  return {
    ...baseOption,
    host: DATABASE_HOST,
    port: +(DATABASE_PORT as string),
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    migrationsRun: true,
    synchronize: false,
    logging: NODE_ENV === 'local' ? true : false,
  };
});

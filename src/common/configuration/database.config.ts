import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';
import { Logger } from '@nestjs/common';

const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

const baseOption: DataSourceOptions = {
  type: 'mysql',
  namingStrategy: new SnakeNamingStrategy(),
  entities: [join(__dirname, '../../../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../../**/*-migration{.ts,.js}')],
};

export default registerAs('database', (): DataSourceOptions => {
  Logger.debug(
    `database.config.ts EntityPath: ${join(
      __dirname,
      '../../**/*.entity{.ts,.js}',
    )}`,
  );
  Logger.debug(
    `database.config.ts MigrationPath: ${join(
      __dirname,
      '../../**/*-migration.{.ts,.js}',
    )}`,
  );

  return {
    ...baseOption,
    host: DATABASE_HOST,
    port: +(DATABASE_PORT as string),
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    migrationsRun: true,
    synchronize: false,
    logging: true,
  };
});

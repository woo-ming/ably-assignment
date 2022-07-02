import { CacheModule, Module } from '@nestjs/common';
import { AppController } from 'src/interface/app/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/common/configuration/env.validation';
import databaseConfig from 'src/common/configuration/database.config';
import { DataSource } from 'typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import type { RedisClientOptions } from 'redis';
import cacheConfig from 'src/common/configuration/cache.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, cacheConfig],
      isGlobal: true,
      validate,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('database') as TypeOrmModuleOptions,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('cache') as RedisClientOptions,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

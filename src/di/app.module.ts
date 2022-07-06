import { CacheModule, Module } from '@nestjs/common';
import { AppController } from 'src/interface/app/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/common/configuration/env.validation';
import databaseConfig from 'src/common/configuration/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RedisClientOptions } from 'redis';
import cacheConfig from 'src/common/configuration/cache.config';
import { UserPersistenceModule } from 'src/infrastructure/persistence/di/user.module';
import { DataSource, DataSourceOptions } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';

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
      useFactory: (configService: ConfigService) =>
        configService.get('database') as DataSourceOptions,
      dataSourceFactory: async (options: DataSourceOptions) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      isGlobal: true,
      useFactory: async (configService: ConfigService) =>
        configService.get('cache') as RedisClientOptions,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.moduleOptions.secret'),
        issuer: configService.get<string>(
          'jwt.moduleOptions.signOptions.issuer',
        ),
      }),
      inject: [ConfigService],
    }),
    UserPersistenceModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

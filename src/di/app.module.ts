import {
  CacheModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from 'src/interface/app/app.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from 'src/common/configuration/env.validation';
import databaseConfig from 'src/common/configuration/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import type { RedisClientOptions } from 'redis';
import cacheConfig from 'src/common/configuration/cache.config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/common/middleware/auth.middleware';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import jwtConfig from 'src/common/configuration/jwt.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, cacheConfig, jwtConfig],
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
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: '', method: RequestMethod.GET }, 'api/auth/(.*)')
      .forRoutes('*');
  }
}

import { Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { IsString, IsEnum, IsNumber, validateSync } from 'class-validator';
import { Type } from 'class-transformer';

enum NodeEnvironment {
  LOCAL = 'local',
  DEVELOP = 'dev',
  PRODUCTION = 'prod',
}

class EnvironmentVariables {
  @IsEnum(NodeEnvironment)
  readonly NODE_ENV!: NodeEnvironment;

  @IsNumber()
  readonly PORT!: number;

  @IsString()
  readonly DATABASE_HOST!: string;

  @Type(() => Number)
  @IsNumber()
  readonly DATABASE_PORT!: number;

  @IsString()
  readonly DATABASE_USERNAME!: string;

  @IsString()
  readonly DATABASE_PASSWORD!: string;

  @IsString()
  readonly DATABASE_NAME!: string;

  @IsString()
  readonly CACHE_HOST!: string;

  @Type(() => Number)
  @IsNumber()
  readonly CACHE_PORT!: number;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    Logger.error(errors.toString());
    throw new Error();
  }
  return validatedConfig;
}

import { HttpStatus } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import * as dayjs from 'dayjs';

export enum Result {
  SUCCESS = 'SUCCESS',
  FAIL = 'FAIL',
}

export class CommonResponse<T> {
  @ApiProperty()
  result: Result;
  @ApiProperty()
  data?: T | null;
  @ApiPropertyOptional({ type: String })
  message?: string | null;
  @ApiProperty({ type: Number, example: 200 })
  statusCode: HttpStatus;
  @ApiPropertyOptional({ type: String })
  name?: string | null;
  @ApiProperty()
  timestamp: string;

  private constructor({
    data = null,
    statusCode,
    message = null,
    result,
  }: {
    result: Result;
    data?: T | null;
    message?: string | null;
    statusCode: HttpStatus;
  }) {
    this.result = result;
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.timestamp = dayjs().toISOString();
  }

  static fail({
    message,
    statusCode,
  }: {
    message: string;
    statusCode: HttpStatus;
  }): CommonResponse<any> {
    return new CommonResponse<any>({
      result: Result.FAIL,
      message: message,
      statusCode: statusCode,
      data: null,
    });
  }

  static success<T>(data: T): CommonResponse<T> {
    return new CommonResponse({
      data,
      result: Result.SUCCESS,
      statusCode: HttpStatus.OK,
      message: null,
    });
  }
}

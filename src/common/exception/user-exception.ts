import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends HttpException {
  constructor(message?: string) {
    super(message ?? '사용자가 이미 존재합니다', HttpStatus.BAD_REQUEST);
  }
}

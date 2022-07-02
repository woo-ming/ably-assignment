import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFoundException extends HttpException {
  constructor(message?: string) {
    super(message ?? '엔티티를 찾을 수 없어요', HttpStatus.BAD_REQUEST);
  }
}

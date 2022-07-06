import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { User } from 'src/domain/user/entity/user';

export class UserMainDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  nickname: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.name = user.name;
    this.email = user.email;
    this.createdAt = user.createdAt as Date;
    this.updatedAt = user.updatedAt as Date;
  }
}

export class ModifyUserPasswordDto {
  @ApiProperty()
  @IsString()
  password: string;
}

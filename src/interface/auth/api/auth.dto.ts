import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Matches } from 'class-validator';
import { Regex } from 'src/common/constant/regex';
import { CellphoneVerificationEntity } from 'src/infrastructure/persistence/entity/cellphone-verification.entity';

export class CellphoneVerificationMainDto {
  @ApiProperty()
  requestId: number;
  @ApiProperty()
  cellphone: string;
  @ApiProperty()
  verificationCode: string;
  @ApiProperty()
  verified?: boolean;
  @ApiProperty()
  verifiedAt?: Date;
  @ApiProperty()
  expiredAt: Date;

  constructor(cellphoneVerification: CellphoneVerificationEntity) {
    this.requestId = cellphoneVerification.id;
    this.cellphone = cellphoneVerification.cellphone;
    this.verificationCode = cellphoneVerification.verificationCode;
    this.verified = cellphoneVerification.verified;
    this.verifiedAt = cellphoneVerification.verifiedAt;
    this.expiredAt = cellphoneVerification.expiredAt;
  }
}

export class RegisterCellphoneVerificationDto {
  @ApiProperty()
  @Matches(Regex.IsPhone)
  phone: string;
}

export class VerifyCodeDto {
  @ApiProperty()
  @IsNumber()
  requestId: number;
  @ApiProperty()
  @IsString()
  verificationCode: string;
}

export class SingUpDto {
  @ApiProperty()
  @Matches(Regex.IsEmail)
  email: string;
  @ApiProperty()
  @IsString()
  password: string;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsString()
  nickname: string;
  @ApiProperty()
  @Matches(Regex.IsPhone)
  phone: string;
}

export class SingInDto {
  @ApiProperty()
  @IsString()
  emailOrPhone: string;
  @ApiProperty()
  @IsString()
  password: string;
}

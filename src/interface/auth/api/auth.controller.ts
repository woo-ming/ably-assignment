import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AuthFacade, TokenPairDto } from 'src/application/auth/auth.service';
import { CommonResponse } from 'src/common/response/common-response';
import {
  CellphoneVerificationMainDto,
  RegisterCellphoneVerificationDto,
  SingInDto,
  SingUpDto,
  VerifyCodeDto,
} from './auth.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('/sign-in')
  async signIn(@Body() dto: SingInDto): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(
      await this.authFacade.signIn({
        emailOrPhone: dto.emailOrPhone,
        password: dto.password,
      }),
    );
  }

  @Post('/sign-up')
  async signUp(@Body() dto: SingUpDto): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(
      await this.authFacade.signUp({
        email: dto.email,
        password: dto.password,
        name: dto.name,
        nickname: dto.nickname,
        phone: dto.phone,
      }),
    );
  }

  @Post('cellphone')
  async registerCellphoneVerification(
    @Body() dto: RegisterCellphoneVerificationDto,
  ): Promise<CommonResponse<CellphoneVerificationMainDto>> {
    return CommonResponse.success(
      new CellphoneVerificationMainDto(
        await this.authFacade.sendVerificationCode({ phone: dto.phone }),
      ),
    );
  }

  @Post('cellphone/verify')
  async verifyCellphone(@Body() dto: VerifyCodeDto) {
    return CommonResponse.success(
      new CellphoneVerificationMainDto(
        await this.authFacade.verifyCode({
          requestId: dto.requestId,
          verificationCode: dto.verificationCode,
        }),
      ),
    );
  }
}

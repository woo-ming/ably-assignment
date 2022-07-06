import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthFacade } from 'src/application/auth/auth.service';
import { ApiCommonResponse } from 'src/common/decorator/api-common-response.decorator';
import { CommonResponse } from 'src/common/response/common-response';
import {
  CellphoneVerificationMainDto,
  RegisterCellphoneVerificationDto,
  SingInDto,
  SingUpDto,
  TokenPairDto,
  VerifyCodeDto,
} from './auth.dto';

@ApiTags('auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authFacade: AuthFacade) {}

  @Post('/sign-in')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse({
    schemaType: 'object',
    dto: TokenPairDto,
  })
  async signIn(@Body() dto: SingInDto): Promise<CommonResponse<TokenPairDto>> {
    return CommonResponse.success(
      await this.authFacade.signIn({
        emailOrPhone: dto.emailOrPhone,
        password: dto.password,
      }),
    );
  }

  @Post('/sign-up')
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse({
    schemaType: 'object',
    dto: TokenPairDto,
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse({
    schemaType: 'object',
    dto: CellphoneVerificationMainDto,
  })
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
  @HttpCode(HttpStatus.OK)
  @ApiCommonResponse({
    schemaType: 'object',
    dto: CellphoneVerificationMainDto,
  })
  async verifyCellphone(
    @Body() dto: VerifyCodeDto,
  ): Promise<CommonResponse<CellphoneVerificationMainDto>> {
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

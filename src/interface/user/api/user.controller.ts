import { Body, Controller, Get, Put, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { UserFacade } from 'src/application/user/user.service';
import { ApiCommonResponse } from 'src/common/decorator/api-common-response.decorator';
import { CommonResponse } from 'src/common/response/common-response';
import { ModifyUserPasswordDto, UserMainDto } from './user.dto';

@ApiTags('user')
@Controller('/api/users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}
  @Get('/self')
  @ApiCommonResponse({
    schemaType: 'object',
    dto: UserMainDto,
    isAuth: true,
  })
  async retrieveUserByToken(
    @Req() request: Request,
  ): Promise<CommonResponse<UserMainDto>> {
    const userId = request.user.id;
    const user = await this.userFacade.retrieveUserById({ userId });
    return CommonResponse.success(new UserMainDto(user));
  }

  @Put('/self/password')
  @ApiCommonResponse({
    schemaType: 'object',
    dto: UserMainDto,
    isAuth: true,
  })
  async modifyUserPassword(
    @Req() request: Request,
    @Body() dto: ModifyUserPasswordDto,
  ): Promise<CommonResponse<UserMainDto>> {
    const userId = request.user.id;
    const user = await this.userFacade.modifyUserPassword({
      id: userId,
      password: dto.password,
    });
    return CommonResponse.success(new UserMainDto(user));
  }
}

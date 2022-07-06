import { Body, Controller, Get, Inject, Put, Req } from '@nestjs/common';
import { Request } from 'express';
import { UserFacade } from 'src/application/user/user.service';
import { CommonResponse } from 'src/common/response/common-response';
import { ModifyUserPasswordDto, UserMainDto } from './user.dto';

@Controller('/api/users')
export class UserController {
  constructor(private readonly userFacade: UserFacade) {}
  @Get('/self')
  async retrieveUserByToken(
    @Req() request: Request,
  ): Promise<CommonResponse<UserMainDto>> {
    const userId = request.user.id;
    const user = await this.userFacade.retrieveUserById({ userId });
    return CommonResponse.success(new UserMainDto(user));
  }

  @Put('/self/password')
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

import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { SearchUserDto, CreatedDataDto } from './dto/user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('get-all')
  async find(@Body() bodyData: SearchUserDto) {
    return this.userService.findAllUser(bodyData);
  }

  @Get(':id')
  async findOne(@Body() id: string) {
    return this.userService.findOneUser({ _id: id });
  }

  @Get('user/profile')
  async profile(@Body() id: string) {
    return this.userService.findOneUser({ _id: id });
  }

  @Patch('active/profile')
  async active(
    @Body() bodyData: Partial<SearchUserDto & { verification_code: number }>,
  ) {
    const user = await this.userService.findOneUser({
      username: bodyData.username,
    });
    if (user.verification_code != bodyData.verification_code) {
      throw new HttpException('error in code', 404);
    }
    return this.userService.updateUser(user._id, { status: true });
  }

  @Post()
  async create(@Body() bodyData: Partial<CreatedDataDto>) {
    return this.userService.findOneUser(bodyData);
  }

  @Patch(':id')
  async update(
    @Param() id: string,
    @Body() bodyData: Partial<SearchUserDto>,
    @Req() req: Request | any,
  ) {
    bodyData._id = req.user['sub'];
    return this.userService.updateUser(id, bodyData);
  }

  @Delete(':id')
  async delete(@Param() id: string) {
    return this.userService.DeleteUser({ _id: id });
  }
}

import { AuthGuard } from '@nestjs/passport';
import { CreatedDataDto } from './../users/dto/user.dto';
import {
  LoginUserDto,
  VerificationUserDto,
  RestPasswordDto,
  ForgetPasswordDto,
} from './dto/auth.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { Request, request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() bodyData: LoginUserDto) {
    return this.authService.lgoinUser(bodyData);
  }

  @Post('register')
  async register(@Body() bodyData: CreatedDataDto) {
    return this.authService.registerUser(bodyData);
  }

  @Post('verification')
  async verication(@Body() bodyData: VerificationUserDto) {
    return this.authService.verificationUser(bodyData);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('restPassword')
  async restPassword(
    @Body() bodyData: RestPasswordDto,
    @Req() req: Request | any,
  ) {
    bodyData.id = req.user['sub'];
    return this.authService.restPassword(bodyData);
  }

  @Post('forgetPassword')
  async forgetPassword(@Body() bodyData: ForgetPasswordDto) {
    return this.authService.forgetPassword(bodyData);
  }
}

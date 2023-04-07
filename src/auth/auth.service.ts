import { EmailService } from './../email/email.service';
import { CreatedDataDto } from './../users/dto/user.dto';
import {
  LoginUserDto,
  VerificationUserDto,
  RestPasswordDto,
  ForgetPasswordDto,
} from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as hash from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async getToken(email: string, id: any) {
    try {
      const token = await this.jwt.sign(
        { sub: id, email },
        {
          expiresIn: '1h',
          secret: this.config.get('JWT_SECRET_KEY'),
        },
      );
      return { token };
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async lgoinUser(loginData: LoginUserDto) {
    try {
      const user = await this.usersService.findOneUser({
        username: loginData.username,
        status: true,
      });
      if (!user) {
        throw new HttpException('invalid username or not active', 404);
      }
      const comparePassword = await hash.compare(
        loginData.password,
        user.password,
      );
      if (!comparePassword) {
        throw new HttpException('invalid password', 404);
      }

      return await this.getToken(user.username, user._id);
    } catch (error) {
      throw new HttpException(error, error.status);
    }
  }

  async registerUser(createData: CreatedDataDto) {
    try {
      const newUser = await this.usersService.createUser(createData);
      if (newUser) {
        return newUser;
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async verificationUser(data: VerificationUserDto) {
    try {
      const user = await this.usersService.findOneUser({
        username: data.username,
        verification_code: data.code,
      });
      if (!user) {
        throw new HttpException('no user with this data', 404);
      }
      await this.usersService.updateUser(user._id, {
        status: true,
      });
      return { message: 'this user is now is active' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async forgetPassword({ email }: ForgetPasswordDto) {
    try {
      console.log(email);
      const user = await this.usersService.findOneUser({
        username: email,
      });
      console.log(user);
      if (!user) {
        throw new HttpException('no user', 404);
      }
      const token = await this.getToken(email, user._id);
      const verification_code = Math.floor(Math.random() * 9999);
      await this.usersService.updateUser(user._id, { verification_code });
      await this.emailService.sendEmail({
        from: this.config.get('FROM'),
        to: user.username,
        context: {
          code: verification_code,
          token,
        },
        template: 'rest',
        subject: 'rest',
      });
      return { message: 'send email' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async restPassword({ id, code, password }: RestPasswordDto) {
    try {
      const user = await this.usersService.findOneUser({
        _id: id,
        verification_code: code,
      });
      if (!user) {
        throw new HttpException('no user', 404);
      }
      password = await hash.hash(
        password + this.config.get('HASH'),
        parseInt(this.config.get('SALT') as string),
      );
      await this.usersService.updateUser(id, { password });
      return { message: 'updated' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

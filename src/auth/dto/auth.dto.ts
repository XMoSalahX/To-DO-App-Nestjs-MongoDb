import { IsNotEmpty, IsEmail } from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}

export class VerificationUserDto {
  username: string;
  code: number;
}

export class ForgetPasswordDto {
  email: string;
}
export class RestPasswordDto {
  id: any;
  code: number;
  password: string;
}

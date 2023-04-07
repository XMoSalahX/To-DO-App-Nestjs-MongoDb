import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class SearchUserDto {
  @IsOptional()
  @IsEmail()
  username?: string;

  @IsOptional()
  @IsNotEmpty()
  _id?: any;

  @IsOptional()
  @IsNotEmpty()
  fullname?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  status?: boolean;

  @IsOptional()
  verification_code?: number;
}

export class CreatedDataDto {
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  username: string;

  @IsNotEmpty()
  password?: string;

  @IsOptional()
  status?: boolean;
}

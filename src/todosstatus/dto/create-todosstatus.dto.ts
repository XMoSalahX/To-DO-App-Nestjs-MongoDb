import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodosstatusDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  user: any;
}

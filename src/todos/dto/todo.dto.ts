import { IsNotEmpty, IsOptional } from 'class-validator';
import { Priority, Status } from '../enum/todos.enum';

export class SearchTodoDto {
  @IsOptional()
  @IsNotEmpty()
  _id?: any;

  @IsOptional()
  @IsNotEmpty()
  status?: any;

  @IsOptional()
  @IsNotEmpty()
  user?: string;

  @IsOptional()
  @IsNotEmpty()
  priority?: string;
}

export class CreatedDataDto {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  priority?: Priority;

  @IsOptional()
  status?: any;
}

export class UpdatedDataDto {
  @IsOptional()
  @IsNotEmpty()
  status?: any;

  @IsOptional()
  @IsNotEmpty()
  user?: string;

  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  priority?: Priority;
}

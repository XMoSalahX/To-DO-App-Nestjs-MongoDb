import { PartialType } from '@nestjs/mapped-types';
import { CreateTodosstatusDto } from './create-todosstatus.dto';

export class UpdateTodosstatusDto extends PartialType(CreateTodosstatusDto) {}

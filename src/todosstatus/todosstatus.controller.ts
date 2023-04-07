import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodosstatusService } from './todosstatus.service';
import { CreateTodosstatusDto } from './dto/create-todosstatus.dto';
import { UpdateTodosstatusDto } from './dto/update-todosstatus.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('todosstatus')
@UseGuards(AuthGuard('jwt'))
export class TodosstatusController {
  constructor(private readonly todosstatusService: TodosstatusService) {}

  @Post()
  create(
    @Body() createTodosstatusDto: CreateTodosstatusDto,
    @Req() req: Request | any,
  ) {
    createTodosstatusDto.user = req.user['sub'];
    return this.todosstatusService.create(createTodosstatusDto);
  }

  @Get()
  findAll() {
    return this.todosstatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosstatusService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodosstatusDto: UpdateTodosstatusDto,
  ) {
    return this.todosstatusService.update(id, updateTodosstatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosstatusService.remove(id);
  }
}

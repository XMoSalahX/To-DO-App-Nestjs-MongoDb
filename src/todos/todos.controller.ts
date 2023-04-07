import { Request } from 'express';
import { SearchTodoDto, CreatedDataDto, UpdatedDataDto } from './dto/todo.dto';
import { TodosService } from './todos.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('get-all')
  async find(@Body() bodyData: SearchTodoDto, @Req() req: Request | any) {
    bodyData.user = req.user['sub'];
    return this.todosService.findAllTodo(bodyData);
  }

  @Get(':id')
  async findOne(@Body() id: string) {
    return this.todosService.findOneTodo({ _id: id });
  }

  @Post()
  async create(@Body() bodyData: CreatedDataDto, @Req() req: Request | any) {
    bodyData.user = req.user['sub'];
    return this.todosService.createTodo(bodyData);
  }

  @Patch(':id')
  async update(
    @Param() id: any,
    @Body() bodyData: Partial<UpdatedDataDto>,
    @Req() req: Request | any,
  ) {
    bodyData.user = req.user['sub'];
    return this.todosService.updateTodo(id, bodyData);
  }

  @Delete(':id')
  async delete(@Param() id: string, @Req() req: Request | any) {
    const user = req.user['sub'];
    return this.todosService.DeleteTodo({ _id: id, user });
  }
}

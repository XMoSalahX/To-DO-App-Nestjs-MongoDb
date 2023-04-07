import { Command, Positional } from 'nestjs-command';
import { TodosService } from './../../todos/todos.service';
import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Priority, Status } from 'src/todos/enum/todos.enum';
import { TodosstatusService } from 'src/todosstatus/todosstatus.service';

@Injectable()
export class TodoSeed {
  constructor(
    private readonly todosService: TodosService,
    private readonly todosstatusService: TodosstatusService,
    private readonly userService: UsersService,
  ) {}

  @Command({ command: 'todo:create', describe: 'create todo' })
  async create(
    @Positional({
      type: 'string',
      name: 'title',
    })
    title: string,
    @Positional({
      type: 'string',
      name: 'status',
    })
    status: Status,
    @Positional({
      type: 'string',
      name: 'description',
    })
    description: string,
    @Positional({
      type: 'number',
      name: 'priority',
    })
    priority: Priority,
  ) {
    try {
      const allUser = await this.userService.findAllUser({});
      const alltodosstatusService = await this.todosstatusService.findAll();
      await Promise.all(
        allUser.map(async (user) => {
          await this.todosService.createTodo({
            title,
            description,
            user: user._id,
            priority,
            status: alltodosstatusService[0]._id,
          });
        }),
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

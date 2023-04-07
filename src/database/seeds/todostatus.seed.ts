import { TodosstatusService } from './../../todosstatus/todosstatus.service';
import { Command, Positional } from 'nestjs-command';
import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class TodosstatusSeed {
  constructor(private readonly todosstatusService: TodosstatusService) {}

  @Command({ command: 'todosstatus:create', describe: 'create todosstatus' })
  async create(
    @Positional({
      name: 'name',
      description: 'name of todosstatusService',
      type: 'string',
    })
    name: string,
  ) {
    await this.todosstatusService.create({
      name,
      user: 'a;kjshoiwhv0wnvowe',
    });
  }
}

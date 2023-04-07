import { Module } from '@nestjs/common';
import { TodosstatusService } from './todosstatus.service';
import { TodosstatusController } from './todosstatus.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Todosstatus, TodosstatusSchema } from './model/todosstatus.model';
import { TodosModule } from 'src/todos/todos.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Todosstatus.name, schema: TodosstatusSchema },
    ]),
    TodosModule,
  ],
  controllers: [TodosstatusController],
  providers: [TodosstatusService],
  exports: [TodosstatusService],
})
export class TodosstatusModule {}

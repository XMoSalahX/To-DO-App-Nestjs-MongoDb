import { TodosstatusModule } from './../../todosstatus/todosstatus.module';
import { Todosstatus } from 'src/todosstatus/model/todosstatus.model';
import { TodosModule } from './../../todos/todos.module';
import { UsersModule } from './../../users/users.module';
import { Module } from '@nestjs/common';
import { TodosstatusSeed } from './todostatus.seed';
import { TodoSeed } from './todos.seed';
import { UserSeed } from './user.seed';
@Module({
  imports: [UsersModule, TodosModule, TodosstatusModule],
  providers: [TodosstatusSeed, UserSeed, TodoSeed],
  exports: [TodosstatusSeed, UserSeed, TodoSeed],
})
export class SeedModule {}

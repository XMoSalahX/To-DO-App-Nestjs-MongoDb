import { Todosstatus } from './../../todosstatus/model/todosstatus.model';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/model/user.model';
import { Priority, Status } from '../enum/todos.enum';

export type TodoDocument = Todo & Document;

@Schema({
  timestamps: true,
})
export class Todo {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  @Type(() => User)
  user: User;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Todosstatus.name,
    required: true,
  })
  status: Status;

  @Prop({
    enum: Object.values(Priority),
  })
  priority: Priority;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);

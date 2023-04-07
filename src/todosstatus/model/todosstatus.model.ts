import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/model/user.model';

export type TodosstatusDocument = Todosstatus & Document;

@Schema({
  timestamps: true,
})
export class Todosstatus {
  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: User;
}

export const TodosstatusSchema = SchemaFactory.createForClass(Todosstatus);

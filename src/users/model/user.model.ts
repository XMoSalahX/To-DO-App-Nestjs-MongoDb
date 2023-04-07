import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    unique: true,
    type: String,
    required: true,
  })
  username: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
    required: true,
  })
  fullname: string;

  @Prop({
    type: Number,
  })
  verification_code: number;

  @Prop({
    type: Boolean,
  })
  status: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

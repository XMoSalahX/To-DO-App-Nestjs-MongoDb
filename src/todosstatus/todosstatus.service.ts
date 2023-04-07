import { TodosService } from './../todos/todos.service';
import { Injectable, HttpException } from '@nestjs/common';
import { CreateTodosstatusDto } from './dto/create-todosstatus.dto';
import { UpdateTodosstatusDto } from './dto/update-todosstatus.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todosstatus, TodosstatusDocument } from './model/todosstatus.model';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class TodosstatusService {
  constructor(
    @InjectModel(Todosstatus.name)
    private todostatusModel: Model<TodosstatusDocument>,
    private readonly todos: TodosService,
  ) {}
  async create(createTodosstatusDto: CreateTodosstatusDto) {
    try {
      const newTodosstatus = await this.todostatusModel.create(
        createTodosstatusDto,
      );
      await newTodosstatus.save();
      return newTodosstatus;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAll() {
    try {
      const all = await this.todostatusModel.aggregate([
        {
          $lookup: {
            from: 'todos',
            localField: '_id',
            foreignField: 'status',
            as: 'todos',
          },
        },
      ]);
      return all;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findOne(id: any) {
    try {
      const todosstatus = await this.todostatusModel.findById(id);
      if (!todosstatus) {
        throw new HttpException('not found', 404);
      }
      return todosstatus;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async update(id: any, updateTodosstatusDto: UpdateTodosstatusDto) {
    try {
      const update = await this.todostatusModel.findByIdAndUpdate(
        id,
        updateTodosstatusDto,
      );
      return update;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async remove(id: any) {
    try {
      id = new mongoose.Types.ObjectId(id);
      const update = await this.todostatusModel.findByIdAndDelete(id);
      const all = await this.todos.findAllTodo({ status: id });
      await Promise.all(
        all.map(async (one) => {
          await this.todos.DeleteTodo({ _id: one._id });
        }),
      );
      return update;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

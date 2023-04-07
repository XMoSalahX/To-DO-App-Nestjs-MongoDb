import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './model/todos.model';
import mongoose, { Model, ObjectId } from 'mongoose';
import { CreatedDataDto, SearchTodoDto, UpdatedDataDto } from './dto/todo.dto';
import { Todosstatus } from 'src/todosstatus/model/todosstatus.model';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async findOneTodo(searchData: SearchTodoDto) {
    try {
      searchData._id = new mongoose.Types.ObjectId(searchData._id);
      const todo = await this.todoModel.findOne(searchData);
      return todo;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllTodo(searchData: SearchTodoDto) {
    try {
      console.log(searchData);
      // searchData.status;
      const users = await this.todoModel.aggregate([
        {
          $match: {
            ...(searchData != undefined &&
              searchData.user != undefined && {
                user: new mongoose.Types.ObjectId(searchData.user),
              }),
            ...(searchData != undefined &&
              searchData.status != undefined && {
                status: new mongoose.Types.ObjectId(searchData.status),
              }),
          },
        },
        // {
        // $lookup: {
        // from: 'todosstatuses',
        // localField: 'status',
        // foreignField: '_id',
        // as: 'statusdata',
        // },
        // },
      ]);
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async DeleteTodo(searchData: SearchTodoDto) {
    try {
      searchData._id = new mongoose.Types.ObjectId(searchData._id);
      const todo = await this.findOneTodo(searchData);
      if (todo) {
        await this.todoModel.findByIdAndRemove(searchData._id);
        return { message: 'todo delete' };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createTodo(createData: CreatedDataDto) {
    try {
      const todo = await this.todoModel.create(createData);
      await todo.save();
      return todo;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateTodo(todoId: any, udpateData: UpdatedDataDto) {
    try {
      const todo = await this.findOneTodo({
        _id: new mongoose.Types.ObjectId(todoId),
      });
      console.log(todo);
      if (!todo) {
        throw new HttpException('there are no user with this data', 404);
      }
      await this.todoModel.findByIdAndUpdate(
        new mongoose.Types.ObjectId(todoId),
        udpateData,
        {},
      );

      return { message: 'todo updated' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

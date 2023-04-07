import { Command, Positional } from 'nestjs-command';
import { Injectable, HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { stringify } from 'querystring';

@Injectable()
export class UserSeed {
  constructor(private readonly userService: UsersService) {}

  @Command({ command: 'user:create', describe: 'create user' })
  async create(
    @Positional({
      name: 'username',
      description: 'username of user',
      type: 'string',
    })
    username: string,
    @Positional({
      name: 'password',
      description: 'password of user',
      type: 'string',
    })
    password: string,
    @Positional({
      name: 'fullname',
      description: 'fullname of user',
      type: 'string',
    })
    fullname: string,

    @Positional({
      name: 'status',
      description: 'status of user',
      type: 'boolean',
    })
    status: boolean,
  ) {
    await this.userService.createUser({
      username,
      fullname,
      password,
      status,
    });
  }
}

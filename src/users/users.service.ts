import { ConfigService } from '@nestjs/config';
import { EmailService } from './../email/email.service';
import { Model } from 'mongoose';
import { HttpException, Injectable } from '@nestjs/common';
import { User, UserDocument } from './model/user.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreatedDataDto, SearchUserDto } from './dto/user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService,
  ) {}

  async findOneUser(searchUserDto: SearchUserDto) {
    try {
      const user = await this.userModel.findOne(searchUserDto);
      return user;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async findAllUser(searchData: SearchUserDto) {
    try {
      const users = await this.userModel.find(searchData);
      return users;
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async DeleteUser(searchData: SearchUserDto) {
    try {
      const user = await this.findOneUser(searchData);
      if (user) {
        await this.userModel.deleteOne(searchData);
        return { message: 'user delete' };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async createUser(createData: CreatedDataDto) {
    try {
      const checkUser = await this.findOneUser({
        username: createData.username,
      });

      if (checkUser && checkUser.status) {
        throw new HttpException('there are user with this data', 409);
      }
      let verification_code;
      if (!checkUser || (checkUser && !checkUser.status)) {
        verification_code = Math.floor(Math.random() * 9999);
      }
      let user;
      if (!checkUser) {
        createData.password = await hash(
          createData.password + this.configService.get('HASH'),
          parseInt(this.configService.get('SALT') as string),
        );
        user = await this.userModel.create({
          ...createData,
          verification_code,
          status: createData.status || false,
        });
        await user.save();
      }
      // email here
      await this.emailService.sendEmail({
        from: this.configService.get('FROM'),
        to: createData.username,
        context: {
          code: verification_code,
        },
        template: 'verification',
        subject: 'verification',
      });
      if (!checkUser) {
        return { message: 'user created' };
      } else {
        await this.updateUser(user._id, { verification_code });
        return { message: 'we send new code' };
      }
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  async updateUser(userId: any, udpateData: SearchUserDto) {
    try {
      const user = await this.findOneUser({ _id: userId });
      if (!user) {
        throw new HttpException('there are no user with this data', 404);
      }
      if (udpateData.username) {
        const checkuser = await this.findOneUser({
          _id: { $ne: userId },
          username: udpateData.username,
        });
        if (checkuser) {
          throw new HttpException('there are user with this data', 409);
        }
      }
      await this.userModel.findOneAndUpdate({ _id: userId }, udpateData);

      return { message: 'user updated' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}

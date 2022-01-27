import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Patch,
  UnprocessableEntityException,
  NotFoundException,
  Logger,
} from '@nestjs/common';
import { UserDTO } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get(':rowKey')
  async getUser(@Param('rowKey') rowKey) {
    try {
      return await this.userService.find(rowKey, new User());
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  @Post()
  async createUser(
    @Body()
    userData: UserDTO,
  ) {
    try {
      const user = new User();

      const n = (await this.getAllUsers()).entries.length;
      userData.id = n;

      Object.assign(user, userData);

      return await this.userService.create(user, String(user.id));
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Put(':rowKey')
  async saveUser(@Param('rowKey') rowKey, @Body() userData: UserDTO) {
    try {
      const user = new User();
      Object.assign(user, userData);

      return await this.userService.update(rowKey, user);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Patch(':rowKey')
  async updateUserDetails(
    @Param('rowKey') rowKey,
    @Body() userData: Partial<UserDTO>,
  ) {
    try {
      const user = new User();
      // Disclaimer: Assign only the properties you are expecting!
      Object.assign(user, userData);

      return await this.userService.update(rowKey, user);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Delete(':rowKey')
  async deleteUser(@Param('rowKey') rowKey) {
    try {
      const response = await this.userService.delete(rowKey, new User());
      if (response.statusCode === 204) {
        return null;
      } else {
        throw new UnprocessableEntityException(response);
      }
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}

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
const Fuse = require('fuse.js');

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('list')
  async listAllUsers() {
    return await this.userService.listAllUsers();
  }

  @Get('search/:name')
  async searchByName(@Param('name') name) {
    return await this.userService.searchByName(name);
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

      if (!userData.id) {
        const n = (await this.getAllUsers()).entries.length;
        userData.id = n.toString();
      }

      Object.assign(user, userData);

      return await this.userService.create(user, String(user.id));
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  @Put()
  async saveUser(@Body() userData: UserDTO) {
    try {
      const user = new User();
      Object.assign(user, userData);

      return await this.userService.update(userData.id, user);
    } catch (error) {
      return await this.createUser(userData);
    }
  }

  @Patch(':rowKey')
  async updateUserDetails(
    @Param('rowKey') rowKey,
    @Body() userData: Partial<UserDTO>,
  ) {
    try {
      const oldProps = await this.getUser(rowKey);
      const user = (({ id, name, active, admin }) => ({
        id,
        name,
        active,
        admin,
      }))(oldProps);
      // Assign only the properties you are expecting!
      Object.assign(user, userData);

      return await this.saveUser(user);
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

/* eslint-disable */
import { ProfileService } from './../profile/profile.service';
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  NotFoundException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { UserDto } from './dto/user-create-dto';
import { PostsService } from 'src/posts/posts.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileService: ProfileService,
    private readonly postService: PostsService, // Inject the ProfileService
  ) {}
  // create
  @Post('/create-user')
  createNewUser(@Body() userDto: UserDto) {
    try {
      return this.userService.createUser(userDto);
    } catch (error) {
      throw error;
    }
  }

  // get
  @Get('/all-users')
  async getAllUsers() {
    try {
      return await this.userService.getAllUsers();
    } catch (error) {
      throw error;
    }
  }

  // update
  @Patch('/:id') // Add a new endpoint to update a user by their ID
  async updateUser(@Param('id') userId: number, @Body() userDto: UserDto) {
    try {
      // Call the service method to update the user by ID
      return await this.userService.updateUser(userId, userDto);
    } catch (error) {
      throw error;
    }
  }

  //delete
  @Delete(':id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    try {
      await this.userService.deleteUser(userId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error;
    }
  }
}

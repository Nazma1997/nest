/* eslint-disable */
import { UserDto } from './dto/user-create-dto';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';



@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  //create
  async createUser(userDto: UserDto) {
    // Assuming userDto has the same structure as your Prisma User model
    return await this.prismaService.user.create({
      data: userDto,
    });
  }
  //get
  async getAllUsers(): Promise<User[]> {
    return this.prismaService.user.findMany();
  }

  // update
  async updateUser(userId: number, userDto: UserDto): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id: +userId },
      data: userDto,
    });

    return updatedUser;
  }

  //delete
  async deleteUser(userId: number): Promise<void> {
    // Check if the user exists
    const user = await this.prismaService.user.findUnique({
      where: { id: +userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Check if there are related records (e.g., posts) referencing this user
    const relatedPosts = await this.prismaService.post.findMany({
      where: { authorId: +userId },
    });

    if (relatedPosts.length > 0) {
      throw new Error('User cannot be deleted because related records exist.');
    }

    // If no related records exist, delete the user
    await this.prismaService.user.delete({
      where: { id: +userId },
    });
  }
}

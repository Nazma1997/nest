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
    // Use Prisma transaction to ensure atomicity
    await this.prismaService.$transaction(async (prisma) => {
      // Check if the user exists
      const user = await prisma.user.findUnique({
        where: { id: +userId },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if there are related posts referencing this user
      const relatedPosts = await prisma.post.deleteMany({
        where: { authorId: +userId },
      });

      if (!relatedPosts){
        throw new NotFoundException('User has related post');
      }
        const relatedProfile = await prisma.profile.delete({
          where: { userId: +userId },
        });
       if (!relatedProfile){
         throw new NotFoundException('User has related profile');
       }
        

      // If no related posts exist, delete the user
      await prisma.user.delete({
        where: { id: +userId },
      });

       return { message: 'deleted user' };
    });

   
  }
}

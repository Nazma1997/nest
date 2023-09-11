/* eslint-disable */

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from './../prisma/prisma.service';
import { ProfileService } from 'src/profile/profile.service';
import { PostsService } from 'src/posts/posts.service';

@Module({
  providers: [UserService, PrismaService, ProfileService, PostsService],
  controllers: [UserController]
})
export class UserModule {}

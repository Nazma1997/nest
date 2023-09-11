/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PostDto } from './dto/create-post-dto';
import { Post } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  // create
  async createPost(postDto: PostDto) {
    return await this.prismaService.post.create({
      data: postDto,
    });
  }

  // get
  async getAllPost(): Promise<Post[]> {
    return await this.prismaService.post.findMany();
  }

  // update
  async updatePost(postId: number, postDto: PostDto) {
    const updatedPost = await this.prismaService.post.update({
      where: { id: +postId },
      data: postDto,
    });
    return updatedPost;
  }
  // delete

  async deletePost(postId: number) {
    const post = await this.prismaService.post.findUnique({
      where: { id: +postId }, // Specify the id field with postId
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    await this.prismaService.post.delete({
      where: { id: +postId }, // Specify the id field with postId
    });
  }
}

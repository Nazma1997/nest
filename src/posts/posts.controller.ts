/* eslint-disable */

import { Controller } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post, Body, Get, Patch, Param, Delete} from '@nestjs/common';
import { PostDto } from './dto/create-post-dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService){}
  
  // create
  @Post('/create-post')
  createNewPost(@Body() postDto:PostDto){
    try {
      return  this.postService.createPost(postDto)
       
    } catch (error) {
      throw error
    }
  }

// get

@Get('/all-posts')
getAllPosts(){
  try {
    return this.postService.getAllPost()
  } catch (error) {
    throw error
  }
}

// update

@Patch('/:id')
async updatePost(@Param('id')  postId:number, @Body() postDto:PostDto){
   try {
     await this.postService.updatePost(postId,postDto)
    return {message:'Post updated'}
   } catch (error) {
    throw error
   }
}

@Delete('/:id')
async delete(@Param('id') postId: number){
   try {
     await this.postService.deletePost(postId);
     return {message: 'Post deleted'}
   } catch (error) {
    throw error
   }
}


}

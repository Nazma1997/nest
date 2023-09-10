/* eslint-disable */

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { CategoryModule } from './category/category.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UserModule, ProfileModule, PostsModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

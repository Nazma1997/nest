/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class PostDto {
  @ApiProperty({ description: 'Title of the post' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'Date of creation' })
  // @IsDate()
  createdAt?: Date;

  @ApiProperty({
    description: 'Date of last update (automatically set by the server)',
  })
  // @IsDate()
  updatedAt?: Date;

  @ApiProperty({ description: 'Author ID' })
  @IsNumber()
  authorId: number;

  @ApiProperty({ description: 'Publication status' })
  @IsBoolean()
  published: boolean;
}

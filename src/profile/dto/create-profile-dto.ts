/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';



export class ProfileDto {
  @ApiProperty({ description: 'Please enter name' })
  @IsString()
  bio: string;

  @ApiProperty({ description: 'Please enter email' })
  @IsNumber()
  userId: number;

 
 
}

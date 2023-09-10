/* eslint-disable */
import { ApiProperty } from '@nestjs/swagger';
import { IsString,  IsEmail, IsEnum } from 'class-validator';


enum Role {
  USER ='USER',
  ADMIN='ADMIN'
}

export class UserDto {
  @ApiProperty({ description: 'Please enter name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Please enter email' })
  @IsEmail()
  email: string; 

  @ApiProperty({ enum: ['ADMIN','USER'] })
  @IsEnum(Role)
  role: Role; 
}

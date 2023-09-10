/* eslint-disable */
import { Body, ConflictException, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/create-profile-dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //  create
  @Post('/create-profile')
  createNewProfile(@Body() profileDto: ProfileDto) {
    try {
      return this.profileService.createProfile(profileDto);
    } catch (error) {
      throw error;
    }
  }

  // get
  @Get('/all-profile')
  getAllProfile() {
    try {
      return this.profileService.getAllProfile();
    } catch (error) {
      throw error;
    }
  }

  // update

  @Patch('/:id')
  async updateProfile(
    @Param('id') profileId: number,
    @Body() profileDto: ProfileDto,
  ) {
    try {
      return await this.profileService.updateProfile(profileId, profileDto);
    } catch (error) {
      throw error
    }
  }

  // delete

@Delete('/:id')

async deleteProfile(@Param('id') profileId: number){
  try {
    await this.profileService.delete(profileId);
    return {message: 'Profile Deleted Successfully'}
  } catch (error) {
     if (
        error.message ===
        'User cannot be deleted because related records exist.'
      ) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }
}


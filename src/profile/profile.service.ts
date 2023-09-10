/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProfileDto } from './dto/create-profile-dto';
import { Profile } from '@prisma/client';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  // create
  async createProfile(profileDto: ProfileDto) {
    return await this.prismaService.profile.create({
      data: profileDto,
    });
  }

  //get
  async getAllProfile(): Promise<Profile[]> {
    return await this.prismaService.profile.findMany();
  }

  // update
  async updateProfile(
    profileId: number,
    profileDto: ProfileDto,
  ): Promise<Profile> {
    const updateProfile = await this.prismaService.profile.update({
      where: { id: +profileId },
      data: profileDto,
    });

    return updateProfile;
  }

  //delete
  async delete(profileId: number): Promise<void> {
    const profile = await this.prismaService.profile.findUnique({
      where: { id: +profileId },
    });

    if (!profile) {
      throw new NotFoundException('profile not found');
    }

    await this.prismaService.profile.delete({
      where: { id: +profileId },
    });
  }
}

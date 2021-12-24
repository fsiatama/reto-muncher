import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const data = {
        ...createUserDto,
      };
      const result = await this.prismaService.user.create({
        data,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  async findOne(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    const result = await this.prismaService.user.findUnique({
      where: userWhereUniqueInput,
    });
    if (!result) {
      throw new NotFoundException(`User not found`);
    }
    return result;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const result = await this.prismaService.user.update({
        data: updateUserDto,
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number) {
    try {
      await this.prismaService.user.delete({
        where: {
          id,
        },
      });
      return { success: true };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

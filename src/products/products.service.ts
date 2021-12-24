import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const data = {
        ...createProductDto,
      };
      const result = await this.prismaService.product.create({
        data,
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
    const result = await this.prismaService.product.findUnique({
      where: productWhereUniqueInput,
    });
    if (!result) {
      throw new NotFoundException(`Product not found`);
    }
    return result;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      const result = await this.prismaService.product.update({
        data: updateProductDto,
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
      await this.prismaService.product.delete({
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

import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  findOne(id: number) {
    return this.prismaService.product.findUnique({ where: { id } });
  }

  // async findOne(productWhereUniqueInput: Prisma.ProductWhereUniqueInput) {
  //   const result = await this.prismaService.product.findUnique({
  //     where: productWhereUniqueInput,
  //   });
  //   if (!result) {
  //     throw new NotFoundException(`Product not found`);
  //   }
  //   return result;
  // }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id: id },
      data: updateProductDto,
    });
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

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
    return this.prismaService.product.create({ data: createProductDto });
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
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto,
    });
  }

  async decrementStock(id: number, quantity: number) {
    try {
      await this.findOne({ id });
      return await this.prismaService.$transaction(async (prisma) => {
        const result = await prisma.product.update({
          where: { id },
          data: {
            stock: {
              decrement: quantity,
            },
          },
        });

        const { stock = 0 } = result;

        if (stock < 0) {
          throw new BadRequestException(
            `product ${id} doesn't have enough to decrement ${quantity}`,
          );
        }

        return result;
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async incrementStock(id: number, quantity: number) {
    try {
      await this.findOne({ id });

      return this.prismaService.product.update({
        where: { id },
        data: {
          stock: {
            increment: quantity,
          },
        },
      });
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

import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';

@Injectable()
export class OrderDetailsService {
  constructor(
    private prismaService: PrismaService,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDetailDto: CreateOrderDetailDto) {
    try {
      const product = await this.productsService.findOne({
        id: createOrderDetailDto.productId,
      });

      const { price = 0.0 } = product || {};

      const subtotal = createOrderDetailDto.quantity * Number(price);

      const result = await this.prismaService.orderDetail.create({
        data: {
          quantity: createOrderDetailDto.quantity,
          subtotal,
          product: {
            connect: {
              id: createOrderDetailDto.productId,
            },
          },
          order: {
            connect: {
              id: createOrderDetailDto.orderId,
            },
          },
        },
        include: {
          order: true,
          product: true,
        },
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

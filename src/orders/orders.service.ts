import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const result = await this.prismaService.order.create({
        data: {
          user: {
            connect: {
              id: createOrderDto.userId,
            },
          },
        },
        include: {
          user: true,
        },
      });
      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prismaService.order.findMany({
      include: { user: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.order.findMany({
      where: {
        id,
      },
      include: { user: true },
    });
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}

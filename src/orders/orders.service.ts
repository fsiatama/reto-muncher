import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ProductsService } from '../products/products.service';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    private productsService: ProductsService,
    private balanceService: BalanceService,
  ) {}

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
      include: { user: true, orderDetail: true },
    });
  }

  findOne(id: number) {
    return this.prismaService.order.findUnique({
      where: {
        id,
      },
      include: { user: true, orderDetail: true },
    });
  }

  async checkout(id: number) {
    try {
      return await this.prismaService.$transaction(async (prisma) => {
        const order = await this.findOne(id);

        const { state, orderDetail, userId } = order;

        if (state !== 0) {
          throw new BadRequestException(`The order ${id} cannot be checkout`);
        }

        let amount = 0;

        await orderDetail.reduce(async (a, item) => {
          await a;
          // Process this item
          await this.productsService.decrementStock(
            item.productId,
            item.quantity,
          );

          amount += item.subtotal;
        }, Promise.resolve());

        await this.balanceService.decrement(userId, amount);

        return prisma.order.update({
          data: {
            state: 1,
          },
          where: {
            id,
          },
          include: { user: true, orderDetail: true },
        });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

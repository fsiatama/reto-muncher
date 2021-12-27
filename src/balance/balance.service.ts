import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class BalanceService {
  constructor(
    private prismaService: PrismaService,
    private usersService: UsersService,
  ) {}

  async decrement(userId: number, amount: number) {
    try {
      await this.usersService.findOne({ id: userId });
      return await this.prismaService.$transaction(async (prisma) => {
        const result = await prisma.balance.update({
          where: { userId },
          data: {
            total: {
              decrement: amount,
            },
          },
        });

        const { total = 0 } = result;

        if (total < 0) {
          throw new BadRequestException(
            `userId ${userId} doesn't have enough to decrement ${amount}`,
          );
        }

        return result;
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async increment(userId: number, amount: number) {
    try {
      await this.usersService.findOne({ id: userId });

      return this.prismaService.balance.update({
        where: { userId },
        data: {
          total: {
            increment: amount,
          },
        },
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

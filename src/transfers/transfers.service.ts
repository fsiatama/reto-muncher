import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { BalanceService } from '../balance/balance.service';

@Injectable()
export class TransfersService {
  constructor(
    private prismaService: PrismaService,
    private balanceService: BalanceService,
  ) {}

  async create(createTransferDto: CreateTransferDto) {
    try {
      return await this.prismaService.$transaction(async (prisma) => {
        await this.balanceService.decrement(
          createTransferDto.fromUserId,
          createTransferDto.amount,
        );

        await this.balanceService.increment(
          createTransferDto.toUserId,
          createTransferDto.amount,
        );

        return await prisma.transfer.create({ data: createTransferDto });
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.prismaService.transfer.findMany();
  }
}

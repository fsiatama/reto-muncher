import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { BalanceModule } from '../balance/balance.module';

@Module({
  imports: [PrismaModule, BalanceModule],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}

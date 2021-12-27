import { Controller, Body, Patch, Param } from '@nestjs/common';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { BalanceService } from './balance.service';
import { BalanceEntity } from './entities/balance.entity';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Patch(':userId/decrement')
  @ApiCreatedResponse({ type: BalanceEntity })
  decrement(@Param('userId') userId: string, @Body() { amount }) {
    return this.balanceService.decrement(+userId, amount);
  }
  @Patch(':userId/increment')
  @ApiCreatedResponse({ type: BalanceEntity })
  increment(@Param('userId') userId: string, @Body() { amount }) {
    return this.balanceService.increment(+userId, amount);
  }
}

import { Controller, Body, Patch, Param } from '@nestjs/common';
import { BalanceService } from './balance.service';

@Controller('balance')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Patch(':userId/decrement')
  decrement(@Param('userId') userId: string, @Body() { amount }) {
    return this.balanceService.decrement(+userId, amount);
  }
  @Patch(':userId/increment')
  increment(@Param('userId') userId: string, @Body() { amount }) {
    return this.balanceService.increment(+userId, amount);
  }
}

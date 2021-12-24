import { ApiProperty } from '@nestjs/swagger';

import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly orderId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  readonly productId: number;

  @Min(1.0)
  @ApiProperty()
  readonly quantity: number;
}

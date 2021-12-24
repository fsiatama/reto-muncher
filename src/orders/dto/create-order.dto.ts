import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;
}

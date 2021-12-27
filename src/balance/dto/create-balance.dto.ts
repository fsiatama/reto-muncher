import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBalanceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly total: number;
}

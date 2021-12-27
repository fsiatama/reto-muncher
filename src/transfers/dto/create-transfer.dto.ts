import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTransferDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly toUserId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly fromUserId: number;

  @Min(1.0)
  @ApiProperty()
  readonly amount: number;
}

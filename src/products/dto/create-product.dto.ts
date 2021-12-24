import { ApiProperty } from '@nestjs/swagger';
import {
  IsUrl,
  IsNotEmpty,
  IsPositive,
  MinLength,
  IsOptional,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  readonly name: string;

  @IsOptional()
  @MaxLength(150)
  @ApiProperty({ required: false })
  readonly description: string;

  @Min(1.0)
  @ApiProperty()
  readonly price: number;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ required: false })
  readonly stock: number;

  @IsUrl()
  @IsOptional()
  @ApiProperty({ required: false })
  readonly image: string;
}

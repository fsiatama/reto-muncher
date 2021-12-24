import { Product, Prisma } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal } from '@prisma/client/runtime';

export class ProductEntity implements Product {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty({ type: Decimal })
  price: Prisma.Decimal;

  @ApiProperty({ type: Decimal })
  stock: Prisma.Decimal;

  @ApiProperty({ default: false })
  published: boolean;

  @ApiProperty({ required: false, nullable: true })
  image: string;
}

import { Module } from '@nestjs/common';

import { OrderDetailsService } from './order-details.service';
import { OrderDetailsController } from './order-details.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsModule } from '../products/products.module';

@Module({
  imports: [PrismaModule, ProductsModule],
  controllers: [OrderDetailsController],
  providers: [OrderDetailsService],
})
export class OrderDetailsModule {}

import { Decimal } from '@prisma/client/runtime';
import { Order, Product } from '@prisma/client';

export class OrderDetail {
  id: number;
  productId: number;
  product: Product;
  orderId: number;
  order: Order;
  quantity: Decimal;
  subtotal: Decimal;
}

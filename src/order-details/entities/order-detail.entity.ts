import { Order, Product } from '@prisma/client';

export class OrderDetail {
  id: number;
  productId: number;
  product: Product;
  orderId: number;
  order: Order;
  quantity: number;
  subtotal: number;
}

import { User } from '../../users/entities/user.entity';
import { OrderDetail } from '../../order-details/entities/order-detail.entity';

export class Order {
  date: Date;
  user: User;
  orderDetail: OrderDetail;
  state: number;
}

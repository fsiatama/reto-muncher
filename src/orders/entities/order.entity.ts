import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';

export class Order {
  date: Date;
  user: User;
  products: Product[];
}

import { Decimal } from '@prisma/client/runtime';
import { User } from '../../users/entities/user.entity';

export class Balance {
  id: number;
  userId: number;
  user: User;
  total: Decimal;
}

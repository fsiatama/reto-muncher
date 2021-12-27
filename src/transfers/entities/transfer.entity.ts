import { Decimal } from '@prisma/client/runtime';
import { User } from '../../users/entities/user.entity';

export class Transfer {
  id: number;
  toUser: User;
  toUserId: number;
  fromUser: User;
  fromUserId: number;
  amount: Decimal;
}

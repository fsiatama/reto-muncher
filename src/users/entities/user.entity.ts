import { Balance } from '../../balance/entities/balance.entity';

export class User {
  id: number;
  name: string;
  lastName: string;
  phone: string;
  email: string;
  balance: Balance;
  password: string;
}

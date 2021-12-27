import { Balance } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../users/entities/user.entity';

export class BalanceEntity implements Balance {
  @ApiProperty()
  id: number;

  @ApiProperty()
  userId: number;

  @ApiProperty()
  user: User;

  @ApiProperty()
  total: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

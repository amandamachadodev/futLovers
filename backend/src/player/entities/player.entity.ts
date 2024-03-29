import { Prisma } from '@prisma/client';

export class Player implements Prisma.PlayerUncheckedCreateInput {
  name: string;
  age: number;
  created_at: Date;
  updated_at: Date;
  team_id: number;
}

import { Prisma } from '@prisma/client';

export class Player implements Prisma.PlayerCreateInput {
  name: string;
  age: number;
  created_at: Date;
  updated_at: Date;
  team: Prisma.TeamCreateNestedOneWithoutPlayerInput;
}

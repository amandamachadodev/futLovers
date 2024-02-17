import { Prisma } from '@prisma/client';
import { Player } from '../entities/player.entity';
import { IsDate, IsInt, IsString } from '@nestjs/class-validator';

export class CreatePlayerDto extends Player {
  @IsString()
  name: string;
  @IsInt()
  age: number;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date;
  team: Prisma.TeamCreateNestedOneWithoutPlayerInput;
}

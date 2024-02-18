import { Prisma } from '@prisma/client';
import { Player } from '../entities/player.entity';
import { IsInt, IsString, IsNotEmpty } from 'class-validator';

export class CreatePlayerDto extends Player {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  team: Prisma.TeamCreateNestedOneWithoutPlayerInput;
}

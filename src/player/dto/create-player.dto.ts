import { Prisma } from '@prisma/client';
import { Player } from '../entities/player.entity';
import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreatePlayerDto extends Player {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  age: number;

  @IsNotEmpty()
  @Min(3)
  team: Prisma.TeamCreateNestedOneWithoutPlayerInput;
}

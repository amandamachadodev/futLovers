import { Prisma } from '@prisma/client';
import { Team } from '../entities/team.entity';
import { IsDate, IsInt, IsString } from '@nestjs/class-validator';

export class CreateTeamDto extends Team {
  @IsString()
  name: string;
  @IsDate()
  created_at: Date;
  @IsDate()
  updated_at: Date;
  @IsInt()
  Player: Prisma.PlayerCreateNestedManyWithoutTeamInput;
}

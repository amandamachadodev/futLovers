import { Team } from '../entities/team.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTeamDto extends Team {
  @IsString()
  @IsNotEmpty()
  name: string;
}

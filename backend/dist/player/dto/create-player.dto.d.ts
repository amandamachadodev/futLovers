import { Prisma } from '@prisma/client';
import { Player } from '../entities/player.entity';
export declare class CreatePlayerDto extends Player {
    name: string;
    age: number;
    team: Prisma.TeamCreateNestedOneWithoutPlayerInput;
}
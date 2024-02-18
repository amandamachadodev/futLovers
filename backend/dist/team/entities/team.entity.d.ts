import { Prisma } from '@prisma/client';
export declare class Team implements Prisma.TeamCreateInput {
    name: string;
    created_at: Date;
    updated_at: Date;
    Player: Prisma.PlayerCreateNestedManyWithoutTeamInput;
}

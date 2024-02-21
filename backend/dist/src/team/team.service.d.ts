import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team } from '@prisma/client';
export declare class TeamService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTeamDto: CreateTeamDto): Promise<Team>;
    findAll(): Promise<Team[] | void>;
    findOne(id: number): Promise<Team | void>;
    update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team | void>;
    remove(id: number): Promise<Team>;
}

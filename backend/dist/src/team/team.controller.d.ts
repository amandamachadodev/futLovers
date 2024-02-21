import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
export declare class TeamController {
    private readonly teamService;
    constructor(teamService: TeamService);
    create(createTeamDto: CreateTeamDto): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Promise<void | {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: string): Promise<void | {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, updateTeamDto: UpdateTeamDto): Promise<void | {
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
}

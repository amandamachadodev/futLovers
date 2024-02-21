import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayerController {
    private readonly playerService;
    constructor(playerService: PlayerService);
    create(createPlayerDto: CreatePlayerDto): Promise<{
        id: number;
        name: string;
        age: number;
        team_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Promise<void | {
        id: number;
        name: string;
        age: number;
        team_id: number;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(id: string): Promise<void | {
        id: number;
        name: string;
        age: number;
        team_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, updatePlayerDto: UpdatePlayerDto): Promise<{
        id: number;
        name: string;
        age: number;
        team_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
    remove(id: string): Promise<{
        id: number;
        name: string;
        age: number;
        team_id: number;
        created_at: Date;
        updated_at: Date;
    }>;
}

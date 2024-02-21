import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Player } from '@prisma/client';
export declare class PlayerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPlayerDto: CreatePlayerDto): Promise<Player>;
    findAll(): Promise<Player[] | void>;
    findOne(id: number): Promise<Player | void>;
    update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player>;
    remove(id: number): Promise<Player>;
}

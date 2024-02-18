import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const team = createPlayerDto.team.create.name;
    if (team.length < 4) {
      throw new Error(
        'Nome do time não pode estar vazio ou ter menos de 4 caracteres.',
      );
    }
    return this.prisma.player.create({
      data: createPlayerDto,
      include: {
        team: true,
      },
    });
  }

  async findAll(): Promise<Player[] | void> {
    const players = await this.prisma.player.findMany({
      include: {
        team: true,
      },
    });

    if (!players) {
      throw new NotFoundException('Não existe nenhum jogador');
    }
    return players;
  }

  async findOne(id: number): Promise<Player | void> {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });

    if (!player) {
      throw new NotFoundException('Jogador não encontrado');
    }
    return player;
  }

  async update(id: number, updatePlayerDto: UpdatePlayerDto): Promise<Player> {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });

    if (!player) {
      throw new NotFoundException('Jogador não encontrado');
    }

    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
      include: {
        team: true,
      },
    });
  }

  async remove(id: number): Promise<Player> {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });

    if (!player) {
      throw new NotFoundException('Jogador não encontrado');
    }
    return this.prisma.player.delete({
      where: { id },
    });
  }
}

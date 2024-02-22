import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Player } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    return this.prisma.player.create({
      data: createPlayerDto,
      include: {
        team: true,
      },
    });
  }

  async findAll(): Promise<Player[] | void> {
    return await this.prisma.player.findMany({
      include: {
        team: true,
      },
    });
  }

  async findOne(id: number): Promise<Player | void> {
    const player = await this.prisma.player.findUnique({
      where: { id },
      include: {
        team: true,
      },
    });

    if (!player) {
      throw new NotFoundException();
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
      throw new NotFoundException();
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
    });

    if (!player) {
      throw new NotFoundException();
    }
    return this.prisma.player.delete({
      where: { id },
    });
  }
}

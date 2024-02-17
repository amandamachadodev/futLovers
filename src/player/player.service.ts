import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  create(createPlayerDto: CreatePlayerDto) {
    return this.prisma.player.create({
      data: createPlayerDto,
      include: {
        team: true,
      },
    });
  }

  findAll() {
    return this.prisma.player.findMany({
      include: {
        team: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.player.findMany({
      where: { id },
      include: {
        team: {
          select: { name: true },
        },
      },
    });
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return this.prisma.player.update({
      where: { id },
      data: updatePlayerDto,
      include: {
        team: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.player.delete({
      where: { id },
    });
  }
}

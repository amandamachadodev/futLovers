import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    return this.prisma.team.create({
      data: createTeamDto,
    });
  }

  async findAll(): Promise<Team[] | void> {
    const teams = await this.prisma.team.findMany();
    if (!teams) {
      throw new NotFoundException('Não existe nenhum time');
    }
    return teams;
  }

  async findOne(id: number): Promise<Team | void> {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }
    return team;
  }

  async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team | void> {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }
    return this.prisma.team.update({
      where: { id },
      data: updateTeamDto,
    });
  }

  async remove(id: number): Promise<Team> {
    const team = await this.prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new NotFoundException('Time não encontrado');
    }
    const deleteTeam = await this.prisma.team.delete({
      where: { id },
    });
    if (!deleteTeam) {
      throw new Error('Time esta relacionado a um jogador');
    }
    return deleteTeam;
  }
}

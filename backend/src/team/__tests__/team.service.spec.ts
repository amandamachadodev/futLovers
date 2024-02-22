import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from '../team.service';
import { PrismaService } from '../../prisma/prisma.service';
import prismaMock, { fakeTeams } from '../__tests__/mocks/team-mock';
import { NotFoundException } from '@nestjs/common';

describe('TeamService', () => {
  let service: TeamService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<TeamService>(TeamService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of teams`, async () => {
      const response = await service.findAll();
      expect(response).toEqual(fakeTeams);
      expect(prisma.team.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.team.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it(`should return a single team`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakeTeams[0]);
      expect(prisma.team.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.team.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it(`should return NotFoundException if team does not exist`, async () => {
      jest.spyOn(prisma.team, 'findUnique').mockRejectedValue(new Error());

      try {
        await service.findOne(99);
      } catch (error) {
        expect(new NotFoundException()).toEqual(new NotFoundException());
      }

      expect(prisma.team.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.team.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe('create', () => {
    it(`should create a new team`, async () => {
      const response = await service.create(fakeTeams[0]);

      expect(response).toBe(fakeTeams[0]);
      expect(prisma.team.create).toHaveBeenCalledTimes(1);
      expect(prisma.team.create).toHaveBeenCalledWith({
        data: fakeTeams[0],
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a team`, async () => {
      jest.spyOn(prisma.team, 'findUnique').mockReturnThis();
      const response = await service.update(1, fakeTeams[0]);

      expect(response).toEqual(fakeTeams[0]);
      expect(prisma.team.update).toHaveBeenCalledTimes(1);
      expect(prisma.team.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakeTeams[0],
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete team and return empty body`, async () => {
      jest.spyOn(prisma.team, 'findUnique').mockReturnThis();
      const response = await service.remove(20);

      expect(response).toBe(undefined);
      expect(prisma.team.delete).toHaveBeenCalledTimes(1);
      expect(prisma.team.delete).toHaveBeenCalledWith({ where: { id: 20 } });
    });

    it(`should return NotFoundException if team does not exist`, async () => {
      jest
        .spyOn(prisma.team, 'delete')
        .mockRejectedValue(new NotFoundException());
      //quanto o id é inválido, retorna um erro e a função delete não é chamada
      expect(prisma.team.delete).toHaveBeenCalledTimes(0);
    });
  });
});

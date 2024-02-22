import { Test, TestingModule } from '@nestjs/testing';
import { PlayerService } from '../player.service';
import { PrismaService } from '../../prisma/prisma.service';
import prismaMock, { fakePlayers } from './mocks/player-mock';
import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';

describe('PlayerService', () => {
  let service: PlayerService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayerService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it(`should return an array of playes`, async () => {
      const response = await service.findAll();
      expect(response).toEqual(fakePlayers);
      expect(prisma.player.findMany).toHaveBeenCalledTimes(1);
      expect(prisma.player.findMany).toHaveBeenCalledWith({
        include: {
          team: true,
        },
      });
    });
  });

  describe('findOne', () => {
    it(`should return a single player`, async () => {
      const response = await service.findOne(1);

      expect(response).toEqual(fakePlayers[0]);
      expect(prisma.player.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.player.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          team: true,
        },
      });
    });

    it(`should return NotFoundException if player does not exist`, async () => {
      jest.spyOn(prisma.player, 'findUnique').mockRejectedValue(new Error());

      try {
        await service.findOne(99);
      } catch (error) {
        expect(new NotFoundException()).toEqual(new NotFoundException());
      }

      expect(prisma.player.findUnique).toHaveBeenCalledTimes(1);
      expect(prisma.player.findUnique).toHaveBeenCalledWith({
        where: { id: 99 },
        include: {
          team: true,
        },
      });
    });
  });

  describe('create', () => {
    it(`should create a new player`, async () => {
      const response = await service.create(fakePlayers[0]);

      expect(response).toBe(fakePlayers[0]);
      expect(prisma.player.create).toHaveBeenCalledTimes(1);
      expect(prisma.player.create).toHaveBeenCalledWith({
        data: fakePlayers[0],
        include: {
          team: true,
        },
      });
    });
  });

  describe('updateOne', () => {
    it(`should update a player`, async () => {
      jest.spyOn(prisma.player, 'findUnique').mockReturnThis();
      const response = await service.update(1, fakePlayers[0]);

      expect(response).toEqual(fakePlayers[0]);
      expect(prisma.player.update).toHaveBeenCalledTimes(1);
      expect(prisma.player.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: fakePlayers[0],
        include: {
          team: true,
        },
      });
    });
  });

  describe('deleteOne', () => {
    it(`should delete player and return empty body`, async () => {
      jest.spyOn(prisma.player, 'findUnique').mockReturnThis();
      const response = await service.remove(1);
      expect(response).toBe(undefined);
      expect(prisma.player.delete).toHaveBeenCalledTimes(1);
      expect(prisma.player.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it(`should return NotFoundException if player does not exist`, async () => {
      jest
        .spyOn(prisma.player, 'delete')
        .mockRejectedValue(new NotFoundException());
      //quanto o id é inválido, retorna um erro e a função delete não é chamada
      expect(prisma.player.delete).toHaveBeenCalledTimes(0);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TeamService } from './team.service';
import { PrismaService } from '../prisma/prisma.service';
import prismaMock from 'src/player/__tests__/player-mock';

describe('TeamService', () => {
  let service: TeamService;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
});

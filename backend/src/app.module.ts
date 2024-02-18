import { Module } from '@nestjs/common';
import { PlayerModule } from './player/player.module';
import { PrismaService } from './prisma/prisma.service';
import { TeamModule } from './team/team.module';

@Module({
  imports: [PlayerModule, TeamModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}

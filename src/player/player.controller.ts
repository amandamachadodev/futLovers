import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Controller()
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('players/new')
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @Get('/')
  findAll() {
    return this.playerService.findAll();
  }

  @Get('player/:id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(+id);
  }

  @Put('player/:id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(+id, updatePlayerDto);
  }

  @Delete('players/:id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(+id);
  }
}

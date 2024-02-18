import { CreatePlayerDto } from './create-player.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}

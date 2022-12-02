import redis from 'infrastructure/redis';
import { Module } from '@nestjs/common';
import { PlayerService } from 'modules/player/player.service';
import { PlayerRepository } from 'modules/player/player.repository';
import { PlayerGateway } from 'modules/player/player.gateway';
import { MatchService } from 'modules/match/match.service';
import { RoomRepository } from 'modules/room/room.repository';
import { MatchRepository } from 'modules/match/match.repository';

@Module({
  imports: [redis],
  providers: [
    PlayerGateway,
    PlayerService,
    PlayerRepository,
    MatchService,
    MatchRepository,
    RoomRepository
  ]
})
export class PlayerModule {}
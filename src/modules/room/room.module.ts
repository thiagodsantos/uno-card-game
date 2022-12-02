import redis from 'infrastructure/redis';
import { Module } from "@nestjs/common";
import { RoomService } from 'modules/room/room.service';
import { RoomRepository } from 'modules/room/room.repository';
import { RoomGateway } from 'modules/room/room.gateway';
import { PlayerService } from 'modules/player/player.service';
import { MatchService } from 'modules/match/match.service';
import { PlayerRepository } from 'modules/player/player.repository';
import { MatchRepository } from 'modules/match/match.repository';

@Module({
  imports: [redis],
  providers: [
    RoomGateway,
    RoomService,
    RoomRepository,
    PlayerService,
    PlayerRepository,
    MatchService,
    MatchRepository
  ],
})
export class RoomModule {}
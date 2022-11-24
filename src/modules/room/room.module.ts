import { Module } from "@nestjs/common";
import { RoomService } from 'modules/room/room.service';
import { RoomRepository } from 'modules/room/room.repository';
import { MatchRepository } from 'modules/match/match.repository';
import { RoomGateway } from 'modules/room/room.gateway';
import redis from 'infrastructure/redis';

@Module({
  imports: [redis],
  providers: [
    RoomGateway,
    RoomService,
    RoomRepository,
    MatchRepository
  ],
})
export class RoomModule {}
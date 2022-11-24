import { Module } from '@nestjs/common';
import { MatchService } from 'modules/match/match.service';
import { MatchRepository } from 'modules/match/match.repository';
import { MatchGateway } from 'modules/match/match.gateway';
import { RoomRepository } from 'modules/room/room.repository';
import redis from 'infrastructure/redis';

@Module({
  imports: [redis],
  providers: [
    MatchGateway,
    MatchService,
    MatchRepository,
    RoomRepository
  ]
})
export class MatchModule {}
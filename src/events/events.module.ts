import type { ClientOpts } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { EventsGateway } from 'events/events.gateway';
import { RoomService } from 'modules/room/room.service';
import { RoomRepository } from 'modules/room/room.repository';
import { MatchService } from 'modules/match/match.service';
import { MatchRepository } from 'modules/match/match.repository';

const REDIS_PORT = (process.env.REDIS_HOST ?? 6379) as number;

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: async () => await redisStore({
        socket: {
          host: process.env.REDIS_HOST,
          port: REDIS_PORT,
        }
      }),
      host: process.env.REDIS_HOST,
      port: REDIS_PORT,
    }),
  ],
  providers: [
    EventsGateway,
    RoomService,
    RoomRepository,
    MatchService,
    MatchRepository
  ]
})
export class EventsModule { }
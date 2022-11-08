import type { ClientOpts } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { EventsGateway } from 'events/events.gateway';
import { RoomService } from 'modules/room/room.service';
import { RoomRepository } from 'modules/room/room.repository';
import { MatchService } from 'modules/match/match.service';
import { MatchRepository } from 'modules/match/match.repository';

const REDIS_HOST = (process.env.REDIS_HOST ?? 'localhost') as string;
const REDIS_PORT = (process.env.REDIS_PORT ?? 6379) as number;

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: async () => await redisStore({
        socket: {
          host: REDIS_HOST,
          port: REDIS_PORT,
        }
      }),
      host: REDIS_HOST,
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
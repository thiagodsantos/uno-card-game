import type { ClientOpts } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { CacheModule, Module } from "@nestjs/common";
import { EventsGateway } from "src/events/events.gateway";
import { RoomService } from "src/modules/room/room.service";
import { RoomRepository } from "src/modules/room/room.repository";

@Module({
  imports: [
    CacheModule.register<ClientOpts>({
      store: async () => await redisStore({
        socket: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
        }
      }),
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
    })
  ],
  providers: [
    EventsGateway,
    RoomService,
    RoomRepository
  ]
})
export class EventsModule { }
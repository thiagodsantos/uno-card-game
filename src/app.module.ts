import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from 'events/events.module';
import { RoomModule } from 'modules/room/room.module';

// TODO: Use config file instead
const ENV_FILE = process.env.ENV_FILE ?? null;

@Module({
  imports: [
    EventsModule,
    RoomModule,
    ConfigModule.forRoot({ envFilePath: ENV_FILE })
  ],
})
export class AppModule {}

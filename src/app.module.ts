import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventsModule } from 'events/events.module';
import { RoomModule } from 'modules/room/room.module';

@Module({
  imports: [
    EventsModule,
    RoomModule,
    ConfigModule.forRoot({ envFilePath: ENV_FILE })
  ],
})
export class AppModule {}

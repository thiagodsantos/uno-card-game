import { Module } from '@nestjs/common';
import { EventsModule } from "src/events/events.module";
import { RoomModule } from "src/modules/room/room.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    EventsModule,
    RoomModule, ConfigModule.forRoot({ envFilePath: process.env.ENV_FILE })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

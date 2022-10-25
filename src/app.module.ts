import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { EventsModule } from "src/events/events.module";
import { RoomModule } from "src/modules/room/room.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [EventsModule, RoomModule, ConfigModule.forRoot({ envFilePath: process.env.ENV_FILE })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

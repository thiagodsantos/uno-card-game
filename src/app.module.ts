import { Module } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { EventsModule } from "src/events/events.module";
import { RoomModule } from "src/modules/room/room.module";

@Module({
  imports: [EventsModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

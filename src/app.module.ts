import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'modules/room/room.module';
import { MatchModule } from 'modules/match/match.module';

@Module({
  imports: [
    RoomModule,
    MatchModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}

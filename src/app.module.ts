import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'modules/room/room.module';
import { MatchModule } from 'modules/match/match.module';
import { PlayerModule } from 'modules/player/player.module';

@Module({
  imports: [
    RoomModule,
    MatchModule,
    PlayerModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}

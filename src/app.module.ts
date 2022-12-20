import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoomModule } from 'modules/room/room.module';
import { MatchModule } from 'modules/match/match.module';
import { PlayerModule } from 'modules/player/player.module';
import { GraphQLModule } from 'modules/graphql.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule,
    RoomModule,
    MatchModule,
    PlayerModule,
  ],
})
export class AppModule {}

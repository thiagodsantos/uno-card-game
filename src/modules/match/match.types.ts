import { PlayerEntity } from 'modules/player/player.entity';
import { RoomEntity } from 'modules/room/room.entity';
import { MATCH_STATUS } from 'modules/match/match.enum';

export type CardType = {
  color?: string;
  value: string;
}

export type MatchPlayerType = {
  cards?: CardType[]
} & Omit<PlayerEntity, 'createdAt'>;

export type MatchRoomType = Omit<RoomEntity, 'players' | 'createdAt' | 'addPlayer'>;

export type MatchType = {
  room: MatchRoomType;
  status: MATCH_STATUS;
  players?: MatchPlayerType[];
  availableCards?: CardType[];
  initialCard?: CardType;
  createdAt?: Date;
}
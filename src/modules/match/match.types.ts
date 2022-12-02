import { PlayerEntity } from 'modules/player/player.entity';
import { RoomEntity } from 'modules/room/room.entity';

export type CardType = {
  color?: string;
  value: string;
}

export type MatchPlayerType = {
  cards?: CardType[]
} & Omit<PlayerEntity, 'createdAt' | 'room'>;

export type MatchRoomType = Omit<RoomEntity, 'players' | 'createdAt' | 'addPlayer'>;
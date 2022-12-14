import { CardType } from 'modules/match/match.types';

export interface DataRoomType {
  room?: {
    id: string;
  }
}

export interface DataPlayerType {
  player: {
    name: string;
  }
}

export interface DataPlayCardType {
  card?: CardType
}
import { RoomEntity } from 'modules/room/room.entity';
import { PlayerEntity, PlayerType } from 'modules/player/player.entity';
import { MATCH_STATUS } from 'modules/match/match.enum';

export const PLAYER_INITIAL_QTY_CARDS = 7;

export type CardType = {
  color?: string;
  card: string;
}

export type MatchPlayerType = {
  cards?: CardType[]
} & Omit<PlayerEntity, 'createdAt'>;

export type MatchRoomType = Omit<RoomEntity, 'players' | 'createdAt' | 'addPlayer'>;

type MatchType = {
  room: MatchRoomType;
  status: MATCH_STATUS;
  players?: MatchPlayerType[];
  availableCards?: CardType[];
  createdAt?: Date;
}

export class MatchEntity {
  room: MatchRoomType;
  players?: MatchPlayerType[];
  status: MATCH_STATUS;
  availableCards?: CardType[];
  createdAt: Date;
  
  constructor(match: MatchType) {
    this.room = match.room;
    this.status = match.status;
    this.players = match.players ?? [];
    this.availableCards = match.availableCards ?? [];
    this.createdAt = match.createdAt ?? new Date();
  }
  
  static createFromRoom(room: RoomEntity) {
    return new MatchEntity({
      room: {
        name: room.name
      },
      status: MATCH_STATUS.STARTED,
      createdAt: new Date()
    });
  }
  
  addPlayer(player: MatchPlayerType) {
    this.players.push({
      name: player.name,
      owner: player.owner,
      socketId: player.socketId,
      cards: player.cards ?? []
    });
  }
  
  getPlayerCardsFromDeck(deck: string[]) {
    const cards: CardType[] = [];
    
    for (let i = 0; i < PLAYER_INITIAL_QTY_CARDS; i++) {
      const card: string[] = deck[i].split(',');
      const cardHasColor = card.length > 1;
  
      const playerCard: CardType = {
        card: cardHasColor ? card[1] : card[0],
        color: cardHasColor ? card[0] : undefined
      };
      
      cards.push(playerCard);
    }
    
    return cards;
  }
  
  getAvailableCardsFromDeck(deck: string[]) {
    const cards: CardType[] = [];
    
    for (let i = 0; i < deck.length; i++) {
      const card: string[] = deck[i].split(',');
      const cardHasColor = card.length > 1;
    
      const playerCard: CardType = {
        card: cardHasColor ? card[1] : card[0],
        color: cardHasColor ? card[0] : undefined
      };
    
      cards.push(playerCard);
    }
  
    return cards;
  }
}
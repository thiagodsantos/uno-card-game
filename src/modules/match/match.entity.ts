import { RoomEntity } from 'modules/room/room.entity';
import { PlayerEntity } from 'modules/player/player.entity';
import { MATCH_STATUS } from 'modules/match/match.enum';
import { randomNumber } from 'shared/number';
import { PLAYER_INITIAL_QTY_CARDS } from 'env-vars';

export type CardType = {
  color?: string;
  value: string;
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
  initialCard?: CardType;
  createdAt?: Date;
}

export class MatchEntity {
  room: MatchRoomType;
  players?: MatchPlayerType[];
  status: MATCH_STATUS;
  availableCards?: CardType[];
  initialCard?: CardType;
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
        value: cardHasColor ? card[1] : card[0],
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
        value: cardHasColor ? card[1] : card[0],
        color: cardHasColor ? card[0] : undefined
      };
    
      cards.push(playerCard);
    }
  
    return cards;
  }
  
  getInitialCardFromAvailableCards() {
    const size = this.availableCards.length;
    if (size === 0) {
      return null;
    }
    
    const index = randomNumber(0, size - 1);
    return this.availableCards[index];
  }
  
  removeCardFromDeck(card: CardType) {
    const searchCard: CardType = { value: card.value };
    if (searchCard.color) {
      searchCard.color = card.color;
    }
    
    const index = this.availableCards.indexOf(searchCard);
    if (index > -1) {
      this.availableCards.splice(index, 1);
    }
  }
}
import { PLAYER_INITIAL_QTY_CARDS } from 'env-vars';
import { randomNumber } from 'utils/number';
import { BaseEntity } from 'utils/base-entity';
import { RoomEntity } from 'modules/room/room.entity';
import { MATCH_STATUS } from 'modules/match/match.enum';
import { CardType, MatchPlayerType, MatchRoomType } from 'modules/match/match.types';

interface MatchInterface {
  room: MatchRoomType;
  status: MATCH_STATUS;
  players?: MatchPlayerType[];
  availableCards?: CardType[];
  initialCard?: CardType;
  currentCard?: CardType;
  currentPlayer?: MatchPlayerType;
  createdAt?: Date;
}

export class MatchEntity extends BaseEntity implements MatchInterface {
  room: MatchRoomType;
  players?: MatchPlayerType[];
  status: MATCH_STATUS;
  availableCards?: CardType[];
  initialCard?: CardType;
  currentCard?: CardType;
  currentPlayer?: MatchPlayerType;
  createdAt: Date;
  
  constructor(match: MatchInterface) {
    super(match);
    this.room = match.room;
    this.status = match.status;
    this.players = match.players ?? [];
    this.availableCards = match.availableCards ?? [];
    this.initialCard = match.initialCard ?? null;
    this.currentCard = match.currentCard ?? null;
    this.currentPlayer = match.currentPlayer ?? null;
    this.createdAt = new Date();
  }
  
  /**
   * @param {RoomEntity} room
   * @returns RoomEntity
   */
  static createFromRoom(room: RoomEntity) {
    return new MatchEntity({
      room: {
        name: room.name
      },
      status: MATCH_STATUS.STARTED,
      createdAt: new Date()
    });
  }
  
  /**
   * @param {MatchPlayerType} player
   */
  public addPlayer(player: MatchPlayerType): void {
    this.players.push({
      name: player.name,
      roomOwner: player.roomOwner,
      socketId: player.socketId,
      cards: player.cards ?? []
    });
  }
  
  /**
   * @param {string[]} deck
   * @returns CardType[]
   */
  public getPlayerCardsFromDeck(deck: string[]): CardType[] {
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
  
  /**
   * @param {string[]} deck
   * @returns CardType[]
   */
  public getAvailableCardsFromDeck(deck: string[]): CardType[] {
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
  
  /**
   * @returns CardType
   */
  public getInitialCardFromAvailableCards(): CardType {
    const size = this.availableCards.length;
    if (size === 0) {
      return null;
    }
    
    const index = randomNumber(0, size - 1);
    return this.availableCards[index];
  }
  
  /**
   * @param {CardType} card
   */
  public removeCardFromDeck(card: CardType): void {
    const searchCard: CardType = { value: card.value };
    if (searchCard.color) {
      searchCard.color = card.color;
    }
    
    const index = this.availableCards.indexOf(searchCard);
    if (index > -1) {
      this.availableCards.splice(index, 1);
    }
  }

  /**
   * @param {string} playerName
   * @returns CardType[]
   */
  public getCardsByPlayerName(playerName: string): CardType[] {
    const playerExists = this.players.filter(player => player.name === playerName);
    if (playerExists.length === 0 || playerExists.length > 1) {
      return null;
    }
    
    const [ player ] = playerExists;
    if (player.cards.length === 0) {
      return null;
    }

    return player.cards;
  }

  /**
   * @param {string} playerName
   * @param {CardType[]} cards 
   * @returns MatchPlayerType[]
   */
  public updatePlayerCardsByPlayerName(playerName: string, cards: CardType[]) {
    return this.players.map(player => {
      if (player.name !== playerName) {
        return;
      }

      player.cards = cards;
    });
  }
}

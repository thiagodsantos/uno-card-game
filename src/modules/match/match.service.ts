import { PLAYER_INITIAL_QTY_CARDS } from 'env-vars';
import { BadRequestException, Injectable } from '@nestjs/common';
import { StartMatchDTO } from 'modules/match/dto/start-match.dto';
import { MatchEntity } from 'modules/match/match.entity';
import { MatchRepository } from 'modules/match/match.repository';
import { RoomRepository } from 'modules/room/room.repository';
import { CardEntity } from 'modules/card/card.entity';
import { CardType } from './match.types';

@Injectable()
export class MatchService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly matchRepository: MatchRepository
  ) {}

  /**
   * Get match by room name
   * @param {string} roomName
   * @returns MatchEntity
   */
  public async getMatchByRoomName(roomName: string): Promise<MatchEntity> {
    const match = await this.matchRepository.getMatchByRoomName(roomName);
    if (!match) {
      throw new BadRequestException(`Match in room ${roomName} not exists`);
    }

    return match;
  }
  
  /**
   * Start match by DTO
   * @param {StartMatchDTO} startMatchDTO
   */
  public async start(startMatchDTO: StartMatchDTO): Promise<void> {
    const matchExists = await this.matchRepository.getMatchByRoomName(startMatchDTO.roomName);
    if (matchExists) {
      throw new BadRequestException(`Match in room ${startMatchDTO.roomName} already exists`);
    }
    
    const room = await this.roomRepository.getRoom(startMatchDTO.roomName);
    if (!room) {
      throw new BadRequestException(`Room ${startMatchDTO.roomName} not exists`);
    }
    
    const hasPlayers = room.players.length > 1;
    if (!hasPlayers) {
      throw new BadRequestException(`Room ${startMatchDTO.roomName} without players`);
    }
  
    const deck  = (new CardEntity()).getDeck();
    const match = MatchEntity.createFromRoom(room);
    const cards = match.getPlayerCardsFromDeck(deck);
    
    for (const player of room.players) {
      match.addPlayer({ ...player, cards });
      deck.splice(0, PLAYER_INITIAL_QTY_CARDS);
    }
    
    const availableCards = match.getAvailableCardsFromDeck(deck);
    if (!availableCards.length) {
      throw new BadRequestException(`Room ${startMatchDTO.roomName} without available cards in deck`);
    }
    
    match.availableCards = availableCards;
    
    const initialCard = match.getInitialCardFromAvailableCards();
    if (!initialCard) {
      throw new BadRequestException(`Room ${startMatchDTO.roomName} without initial card`);
    }
    
    match.initialCard = initialCard;
    match.removeCardFromDeck(initialCard);
    
    await this.matchRepository.store(match);
  }

  /**
   * Store match
   * @param {MatchEntity} match
   */
  public async store(match: MatchEntity): Promise<void> {
    await this.matchRepository.store(match);
  }
}
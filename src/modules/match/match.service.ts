import { BadRequestException, Injectable } from '@nestjs/common';
import { StartMatchDTO } from 'modules/match/dto/start-match.dto';
import { MatchEntity, PLAYER_INITIAL_QTY_CARDS } from 'modules/match/match.entity';
import { MatchRepository } from 'modules/match/match.repository';
import { RoomRepository } from 'modules/room/room.repository';
import { CardEntity } from 'modules/card/card.entity';

@Injectable()
export class MatchService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly matchRepository: MatchRepository
  ) {}
  
  /**
   * Start match by DTO
   * @param {StartMatchDTO} startMatchDTO
   */
  public async start(startMatchDTO: StartMatchDTO) {
    const matchExists = await this.matchRepository.getMatch(startMatchDTO.room);
    if (matchExists) {
      throw new BadRequestException(`Match in room ${startMatchDTO.room} already exists`);
    }
    
    const room = await this.roomRepository.getRoom(startMatchDTO.room);
    if (!room) {
      throw new BadRequestException(`Room ${startMatchDTO.room} not exists`);
    }
    
    const hasPlayers = room.players.length > 1;
    if (!hasPlayers) {
      throw new BadRequestException(`Room ${startMatchDTO.room} without players`);
    }
    
    const match = MatchEntity.createFromRoom(room);
    const cardEntity = new CardEntity();
    let deck = cardEntity.getDeck();
    
    for (const player of room.players) {
      const cards = match.getPlayerCardsFromDeck(deck);
      
      match.addPlayer({ ...player, cards });
      deck.splice(0, PLAYER_INITIAL_QTY_CARDS - 1);
    }
    
    match.availableCards = match.getAvailableCardsFromDeck(deck);
    
    await this.matchRepository.createMatch(match);
  }
}
// Nest.js
import { BadRequestException, Injectable } from "@nestjs/common";

// Match
import { MatchService } from "modules/match/match.service";

// Player
import { PlayCardDTO } from "modules/player/dto/play-card.dto";
import { PlayerEntity } from "modules/player/player.entity";
import { PlayerRepository } from "modules/player/player.repository";

@Injectable()
export class PlayerService {
  constructor(
    private readonly matchService: MatchService,
    private readonly playerRepository: PlayerRepository
  ) {}

  public async store(player: PlayerEntity) {
    await this.playerRepository.store(player);
  }

  /**
   * Player play card in match
   * @param {PlayCardDTO} playCardDTO
   */
  public async playCard(playCardDTO: PlayCardDTO) {
    const match = await this.matchService.getMatchByRoomName(playCardDTO.roomName);

    const playerCards = match.getCardsByPlayerName(playCardDTO.playerName);
    if (!playerCards) {
      throw new BadRequestException(`Player ${playCardDTO.playerName} without cards`);
    }
  
    let playerHasCard = false;
    for (const [index, playerCard] of playerCards.entries()) {
      const sameColor = Boolean(playerCard.color) ? playerCard.color === playCardDTO.card.color : true;
      const sameValue = playerCard.value === playCardDTO.card.value;
  
      if (sameColor && sameValue) {
        playerHasCard = true;
        playerCards.splice(index, 1);
        break;
      }
    }
    
    if (!playerHasCard) {
      const { value, color } = playCardDTO.card;
      const card = color ? `${color} ${value}` : value;
      throw new BadRequestException(`Player ${playCardDTO.playerName} without card ${card}`);
    }

    match.currentCard = playCardDTO.card;
    match.updatePlayerCardsByPlayerName(playCardDTO.playerName, playerCards);

    await this.matchService.store(match);
  }
}
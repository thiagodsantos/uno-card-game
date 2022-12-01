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

    const removeCardFromPlayer = playerCards.filter(playerCard => {
      const sameValue = playerCard.value === playCardDTO.card.value;
      if (!sameValue) {
        return true;
      }

      const hasColor = Boolean(playerCard.color);
      if (sameValue || !hasColor) {
        return false;
      }

      const sameColor = playerCard.color === playCardDTO.card.color;
      if (sameValue || sameColor) {
        return false;
      }

      return true;
    });

    const playerHasPlayCard = playerCards.length === removeCardFromPlayer.length;
    if (!playerHasPlayCard) {
      const { value, color } = playCardDTO.card;
      const card = color ? `${color} ${value}` : value;
      throw new BadRequestException(`Player ${playCardDTO.playerName} without card ${card}`);
    }

    match.currentCard = playCardDTO.card;
    match.updatePlayerCardsByPlayerName(playCardDTO.playerName, removeCardFromPlayer);

    await this.matchService.store(match);
  }
}
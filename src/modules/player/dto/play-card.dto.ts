import { PlayerMessageDTO } from "modules/player/dto/player-message.dto";
import { CardType } from "modules/match/match.types";

export class PlayCardDTO {
  readonly card: CardType;
  readonly roomName: string;
  readonly playerName: string;

  constructor(playCard: PlayCardDTO) {
    this.card = playCard.card;
    this.roomName = playCard.roomName;
    this.playerName = playCard.playerName;
  }

  static fromPlayerMessageDTO(playerMessageDTO: PlayerMessageDTO) {
    return new PlayCardDTO({
      card: playerMessageDTO.data.card,
      roomName: playerMessageDTO.data.room.id,
      playerName: playerMessageDTO.data.player.name
    });
  }
}
import { PlayerMessageDTO } from "modules/player/dto/player-message.dto";
import { CardType } from "modules/match/match.types";

export class PlayCardDTO {
  readonly card: CardType;
  readonly player: string;
  readonly room: string;

  constructor(playCard: PlayCardDTO) {
    this.card = playCard.card;
    this.player = playCard.player;
    this.room = playCard.room;
  }

  static fromPlayerMessageDTO(playerMessageDTO: PlayerMessageDTO) {
    return new PlayCardDTO({
      card: playerMessageDTO.data.card,
      player: playerMessageDTO.data.player.name,
      room: playerMessageDTO.data.room.name
    });
  }
}
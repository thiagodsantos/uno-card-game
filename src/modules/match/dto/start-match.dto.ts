import { MatchMessageDTO } from 'events/dto/match/match-message.dto';

export class StartMatchDTO {
  readonly room: string;
  
  constructor(startMatch: StartMatchDTO) {
    this.room = startMatch.room;
  }
  
  static fromMatchMessageDTO(matchMessageDTO: MatchMessageDTO) {
    return new StartMatchDTO({
      room: matchMessageDTO.data.room.name,
    });
  }
}
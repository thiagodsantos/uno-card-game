import { MatchMessageDTO } from 'modules/match/dto/match-message.dto';

export class StartMatchDTO {
  readonly roomName: string;
  
  constructor(startMatch: StartMatchDTO) {
    this.roomName = startMatch.roomName;
  }
  
  static fromMatchMessageDTO(matchMessageDTO: MatchMessageDTO) {
    return new StartMatchDTO({
      roomName: matchMessageDTO.data.room.name,
    });
  }
}
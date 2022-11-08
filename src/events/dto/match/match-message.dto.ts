import { MATCH_EVENTS } from 'modules/match/match.enum';

export class MatchMessageDTO {
  event: MATCH_EVENTS;
  data: {
    room: {
      name: string;
    }
  };
  socketId: string;
}
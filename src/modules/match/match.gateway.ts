import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { BadRequestException } from '@nestjs/common';
import { CORS_ORIGIN, SOCKET_PORT } from 'env-vars';
import { MatchMessageDTO } from 'modules/match/dto/match-message.dto';
import { MATCH_EVENTS } from 'modules/match/match.enum';
import { StartMatchDTO } from 'modules/match/dto/start-match.dto';
import { MatchService } from 'modules/match/match.service';

@WebSocketGateway(SOCKET_PORT, { cors: { origin: CORS_ORIGIN } })
export class MatchGateway {
  constructor(private readonly matchService: MatchService) {}
  
  @SubscribeMessage('match')
  async match(@MessageBody() message: MatchMessageDTO) {
    console.log('\n## NEW MESSAGE: MATCH ##\n');
    console.log(message);
    
    // TODO: validate using class-validator
    const event = message.event;
    if (!event) {
      throw new BadRequestException('Event is required');
    }
    
    if (event === MATCH_EVENTS.START) {
      return this.matchService.start(StartMatchDTO.fromMatchMessageDTO(message));
    }
    
    throw new BadRequestException(`Match event ${event} not found`);
  }
}
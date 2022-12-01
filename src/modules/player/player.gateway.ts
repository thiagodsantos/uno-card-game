import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { BadRequestException } from '@nestjs/common';
import { CORS_ORIGIN, SOCKET_PORT } from 'env-vars';
import { PlayerMessageDTO } from 'modules/player/dto/player-message.dto';
import { PlayCardDTO } from 'modules/player/dto/play-card.dto';
import { PLAYER_EVENTS } from 'modules/player/player.enum';
import { PlayerService } from 'modules/player/player.service';

@WebSocketGateway(SOCKET_PORT, { cors: { origin: CORS_ORIGIN } })
export class PlayerGateway {
  constructor(private readonly playerService: PlayerService) {}
  
  @SubscribeMessage('player')
  public async player(@MessageBody() message: PlayerMessageDTO) {
    console.log('\n## NEW MESSAGE: PLAYER ##\n');
    console.log(message);
    
    // TODO: validate using class-validator
    const event = message.event;
    if (!event) {
      throw new BadRequestException('Event is required');
    }
    
    if (event === PLAYER_EVENTS.PLAY_CARD) {
      return this.playerService.playCard(PlayCardDTO.fromPlayerMessageDTO(message));
    }
    
    throw new BadRequestException(`Player event ${event} not found`);
  }
}
import { Server } from 'socket.io';
import { CORS_ORIGIN, SOCKET_PORT } from 'env-vars';
import { BadRequestException } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MATCH_EVENTS } from 'modules/match/match.enum';
import { ROOM_EVENTS } from 'modules/room/room.enum';
import { RoomMessageDTO } from 'events/dto/room/room-message.dto';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';
import { MatchMessageDTO } from 'events/dto/match/match-message.dto';
import { StartMatchDTO } from 'modules/match/dto/start-match.dto';
import { RoomService } from 'modules/room/room.service';
import { MatchService } from 'modules/match/match.service';

@WebSocketGateway(SOCKET_PORT, { cors: { origin: CORS_ORIGIN } })
export class EventsGateway {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly roomService: RoomService,
    private readonly matchService: MatchService
  ) {}

  @SubscribeMessage('room')
  async room(@MessageBody() message: RoomMessageDTO) {
    console.log('\n## NEW MESSAGE: ROOM ##\n');
    console.log(message);
    
    // TODO: validate using class-validator
    const event = message.event;
    if (!event) {
      throw new BadRequestException('Event is required');
    }
    
    const data = message.data;
    if (!data) {
      throw new BadRequestException('Invalid data');
    }
  
    const roomName = data?.room ?? null;
    if (roomName === null) {
      throw new BadRequestException('Room name required');
    }
  
    if (event === ROOM_EVENTS.CREATE) {
      return await this.roomService.createRoom(CreateRoomDTO.fromRoomMessageDTO(message));
    }
    
    if (event === ROOM_EVENTS.JOIN) {
      return await this.roomService.joinRoom(JoinRoomDTO.fromRoomMessageDTO(message));
    }
  
    throw new BadRequestException(`Room event ${event} not found`);
  }
  
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
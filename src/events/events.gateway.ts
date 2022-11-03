import { Server } from 'socket.io';
import { BadRequestException } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { RoomMessageDTO } from 'events/dto/room/room-message.dto';
import { RoomService } from 'modules/room/room.service';
import { ROOM_EVENTS } from 'modules/room/room.enum';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';

// TODO: Use config file instead
const PORT        = (process.env.SOCKET_PORT ?? 8003) as number;
const CORS_ORIGIN = (process.env.CORS_ORIGIN ?? '*') as string;

@WebSocketGateway(PORT, { cors: { origin: CORS_ORIGIN } })
export class EventsGateway {
  @WebSocketServer()
  private server: Server;

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage('room')
  async room(@MessageBody() message: RoomMessageDTO) {
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
  
    throw new BadRequestException(`Room ${roomName} not found`);
  }
}
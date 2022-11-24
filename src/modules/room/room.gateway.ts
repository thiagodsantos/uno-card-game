import { Server } from 'socket.io';
import { BadRequestException } from '@nestjs/common';
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { CORS_ORIGIN, SOCKET_PORT } from 'env-vars';
import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';
import { ROOM_EVENTS } from 'modules/room/room.enum';
import { RoomService } from 'modules/room/room.service';
import { RoomMessageDTO } from 'modules/room/dto/room-message.dto';

@WebSocketGateway(SOCKET_PORT, { cors: { origin: CORS_ORIGIN } })
export class RoomGateway {
  constructor(private readonly roomService: RoomService) {};

  @SubscribeMessage('room')
  async room(@MessageBody() message: RoomMessageDTO) {
    console.log('\n## NEW MESSAGE: ROOM ##\n');
    console.log(message);
    
    // TODO: validate using class-validator
    const event = message.event;
    if (!event) {
      throw new BadRequestException('Event is required');
    }
    
    // TODO: validate using class-validator
    const data = message.data;
    if (!data) {
      throw new BadRequestException('Invalid data');
    }
  
    // TODO: validate using class-validator
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
}
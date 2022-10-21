import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';
import { BadRequestException } from "@nestjs/common";
import { RoomService } from "../modules/room/room.service";

@WebSocketGateway(8003, { cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly roomService: RoomService) {}
  
  @SubscribeMessage('room')
  async room(@MessageBody() data: any) {
    if (!data.event) {
      throw new BadRequestException('INVALID EVENT');
    }
    
    return await this.roomService.execute(data.event);
    
    /**
     * TODO: criar os seguintes métodos para sala
     * - create para criação da sala
     * - entrar na sala
     * - encerrar sala
     */
  }
}
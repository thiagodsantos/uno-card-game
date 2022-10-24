import { Server } from 'socket.io';
import { BadRequestException } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RoomService } from "src/modules/room/room.service";

@WebSocketGateway(8003, { cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly roomService: RoomService) {}
  
  @SubscribeMessage('room')
  async room(@MessageBody() message: any) {
    if (!message.event) {
      throw new BadRequestException('Invalid event');
    }
    
    return await this.roomService.execute(message.event, message.data);
    
    /**
     * TODO: criar os seguintes métodos para sala
     * - create para criação da sala
     * - entrar na sala
     * - encerrar sala
     */
  }
}
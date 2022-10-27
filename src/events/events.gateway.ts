import { Server } from 'socket.io';
import { BadRequestException } from "@nestjs/common";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RoomService } from "src/modules/room/room.service";

const port = (process.env.SOCKET_PORT ?? 8003) as number;

@WebSocketGateway(port, { cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly roomService: RoomService) { }

  @SubscribeMessage('room')
  async room(@MessageBody() message: any) {
    if (!message.event) {
      throw new BadRequestException('Invalid event');
    }

    return await this.roomService.execute(message.event, message.data);
  }
}
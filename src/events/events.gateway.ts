import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from 'socket.io';

@WebSocketGateway(8003, { cors: { origin: '*' } })
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('events')
  findAll(@MessageBody() data: any) {
    console.log(data);
  }
  
  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number) {
    console.log(data);
  }
}
import { BadRequestException, Injectable } from "@nestjs/common";

enum ROOM_EVENTS {
  CREATE_ROOM = 'create_room',
  JOIN_ROOM   = 'join_room',
  REMOVE_ROOM = 'remove_room',
}

@Injectable()
export class RoomService {
  private async createRoom() {
    return 'Criando sala...';
  }
  
  private async joinRoom() {
    return 'Entrando na sala...';
  }
  
  private async removeRoom() {
    return 'Removendo sala...';
  }
  
  async execute(event: ROOM_EVENTS) {
    if (event === ROOM_EVENTS.CREATE_ROOM) {
      return this.createRoom();
    }
  
    if (event === ROOM_EVENTS.JOIN_ROOM) {
      return this.joinRoom();
    }
  
    if (event === ROOM_EVENTS.REMOVE_ROOM) {
      return this.removeRoom();
    }
    
    throw new BadRequestException('EVENT NOT FOUND');
  }
}
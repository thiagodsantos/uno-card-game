import { BadRequestException, Injectable } from "@nestjs/common";
import { RoomRepository } from "src/modules/room/room.repository";

/**
 * Room events available
 */
enum ROOM_EVENTS {
  CREATE_ROOM = 'create_room',
  JOIN_ROOM   = 'join_room',
  REMOVE_ROOM = 'remove_room',
}

/**
 * Type received from message.data body
 */
export interface RoomTypes {
  room: {
    name?: string;
  }
}

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository) {}
  
  /**
   * Create room by name
   * @param string roomName
   */
  private async createRoom(roomName: string) {
    const room = await this.roomRepository.getRoom(roomName);
    if (room) {
      throw new BadRequestException(`Room ${roomName} already exists`);
    }
    
    return await this.roomRepository.createRoom(roomName);
  }
  
  /**
   * Join room by name
   * @param string roomName
   * @private
   */
  private async joinRoom(roomName: string) {
    const room = await this.roomRepository.getRoom(roomName);
    if (!room) {
      throw new BadRequestException(`Room ${roomName} not exits`);
    }
    
    return room;
  }
  
  /**
   * Remove room by name
   * @param string roomName
   * @private
   */
  private async removeRoom(roomName: string) {
    return this.roomRepository.removeRoom(roomName);
  }
  
  /**
   * Execute event by name
   * @param eventName
   * @param data
   */
  async execute(eventName: string, data: RoomTypes) {
    const roomName = data?.room.name ?? null;
    if (roomName === null) {
      throw new BadRequestException('Room name required');
    }
    
    if (eventName === ROOM_EVENTS.CREATE_ROOM) {
      return await this.createRoom(roomName);
    }
  
    if (eventName === ROOM_EVENTS.JOIN_ROOM) {
      return this.joinRoom(roomName);
    }
  
    if (eventName === ROOM_EVENTS.REMOVE_ROOM) {
      return this.removeRoom(roomName);
    }
    
    throw new BadRequestException(`Room ${roomName} not found`);
  }
}
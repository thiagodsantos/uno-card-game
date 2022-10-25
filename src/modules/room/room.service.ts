import { generate as generateUid } from "short-uuid"
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { RoomRepository } from "src/modules/room/room.repository";

/**
 * Room events available
 */
enum ROOM_EVENTS {
  CREATE_ROOM = 'create_room',
  JOIN_ROOM   = 'join_room',
  REMOVE_ROOM = 'remove_room',
}

interface RoomType {
  name?: string;
  players: PlayerType[];
}

interface PlayerType {
  name?: string;
}

/**
 * Type received from message.data body
 */
export interface DataType {
  room: RoomType;
}

export class RoomEntity {
  name: string;
  createdAt: Date;
}

@Injectable()
export class RoomService {
  constructor(private roomRepository: RoomRepository) {}
  
  /**
   * Create room by name
   * @param string roomName
   */
  private async createRoom(data: DataType): Promise<string> {
    const name = data.room.name + '_' + generateUid();
    
    const room = await this.roomRepository.getRoom(name);
    if (room) {
      throw new BadRequestException(`Room ${name} already exists`);
    }
    
    try {
      await this.roomRepository.createRoom(name);
      // TODO: Dispatch command createdRoom
      return name;
    } catch (error) {
      throw new InternalServerErrorException(`Error on create room ${name}`);
    }
  }
  
  /**
   * Join room by name
   * @param string roomName
   */
  private async joinRoom(data: DataType): Promise<RoomEntity> {
    let room: RoomEntity;
    
    const roomName = data.room.name;
    
    try {
      room = await this.roomRepository.getRoom(roomName);
    } catch (error) {
      throw new InternalServerErrorException(`Error on get room ${roomName}`);
    }
    
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
  private async removeRoom(roomName: string): Promise<void> {
    try {
      await this.roomRepository.removeRoom(roomName);
    } catch (error) {
      throw new InternalServerErrorException(`Error on get room ${roomName}`);
    }
  }
  
  /**
   * Execute event by name
   * @param eventName
   * @param data
   */
  async execute(eventName: string, data: DataType) {
    const roomName = data?.room?.name ?? null;
    if (roomName === null) {
      throw new BadRequestException('Room name required');
    }
    
    if (eventName === ROOM_EVENTS.CREATE_ROOM) {
      return await this.createRoom(data);
    }
  
    if (eventName === ROOM_EVENTS.JOIN_ROOM) {
      return this.joinRoom(data);
    }
  
    if (eventName === ROOM_EVENTS.REMOVE_ROOM) {
      return this.removeRoom(roomName);
    }
    
    throw new BadRequestException(`Room ${roomName} not found`);
  }
}
import { generate } from 'short-uuid';
import { PlayerInterface } from 'modules/player/player.entity';
import { BaseEntity } from 'utils/base-entity';

interface RoomInterface {
  name: string;
  players?: PlayerInterface[];
  createdAt?: Date;
}

export class RoomEntity extends BaseEntity implements RoomInterface {
  name: string;
  players?: PlayerInterface[];
  createdAt: Date;
  
  constructor(room: RoomInterface) {
    super(room);
    this.name = room.name;
    this.players = room.players ?? [];
    this.createdAt = room.createdAt ?? new Date();
  }
  
  private static generateRoomName(roomName: string) {
    const regex = /\s/ig;
    const name  = (roomName.replaceAll(regex, '-') + '-' + generate()).toLowerCase();
    
    return name;
  }
  
  static create(roomName: string) {
    return new RoomEntity({
      name: RoomEntity.generateRoomName(roomName)
    });
  }
  
  addPlayer(player: PlayerInterface) {
    this.players.push(player);
  }
}
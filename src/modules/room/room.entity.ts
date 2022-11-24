import { generate } from 'short-uuid';
import { PlayerType } from 'modules/player/player.entity';
import { BaseEntity } from 'utils/base-entity';

export type RoomType = {
  name: string;
  players?: PlayerType[];
  createdAt?: Date;
}

export class RoomEntity extends BaseEntity {
  name: string;
  players?: PlayerType[];
  createdAt: Date;
  
  constructor(room: RoomType) {
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
  
  addPlayer(player: PlayerType) {
    this.players.push(player);
  }
}
import { generate } from 'short-uuid';
import { PlayerType } from 'modules/player/player.entity';
import { BaseEntity } from 'shared/base-entity';

export const MAX_PLAYERS = (process.env.MAX_PLAYERS ?? 10) as number;

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
    super();
    this.name = room.name;
    this.players = room.players ?? [];
    this.createdAt = room.createdAt ?? new Date();
  }
  
  static create(roomName: string) {
    return new RoomEntity({
      name: roomName + '_' + generate()
    });
  }
  
  addPlayer(player: PlayerType) {
    this.players.push(player);
  }
}
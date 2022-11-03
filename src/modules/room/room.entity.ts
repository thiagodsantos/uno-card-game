import { PlayerEntity } from "modules/player/player.entity";

export const MAX_PLAYERS = (process.env.MAX_PLAYERS ?? 10) as number;

export class RoomEntity {
  name: string;
  players: PlayerEntity[];
  createdAt: Date;
  
  public addPlayer(player: PlayerEntity) {
    this.players.push(player);
  }
}
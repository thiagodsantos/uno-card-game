import { PlayerEntity } from "modules/player/player.entity";

export class RoomEntity {
  name: string;
  players: PlayerEntity[];
  createdAt: Date;
}
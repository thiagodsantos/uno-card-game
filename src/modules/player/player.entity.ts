import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';

export type PlayerType = {
  name: string;
  owner: boolean;
  socketId: string;
  createdAt?: Date;
}

export class PlayerEntity implements PlayerType {
  name: string;
  owner: boolean;
  socketId: string;
  createdAt: Date;
  
  constructor(player: PlayerType) {
    this.name = player.name;
    this.owner = player.owner;
    this.socketId = player.socketId;
    this.createdAt = player.createdAt ?? new Date();
  }
  
  static createFromCreateRoomDTO(createRoomDTO: CreateRoomDTO) {
    return new PlayerEntity({
      owner: true,
      name: createRoomDTO.playerName,
      socketId: createRoomDTO.socketId
    });
  }
  
  static createFromJoinRoomDTO(joinRoomDTO: JoinRoomDTO) {
    return new PlayerEntity({
      owner: false,
      name: joinRoomDTO.playerName,
      socketId: joinRoomDTO.socketId
    });
  }
}
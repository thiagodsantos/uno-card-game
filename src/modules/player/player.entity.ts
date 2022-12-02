import { CreateRoomDTO } from 'modules/room/dto/create-room.dto';
import { JoinRoomDTO } from 'modules/room/dto/join-room.dto';
import { BaseEntity } from 'utils/base-entity';

export interface PlayerInterface {
  name: string;
  room?: string;
  roomOwner: boolean;
  socketId: string;
}

export class PlayerEntity extends BaseEntity implements PlayerInterface {
  name: string;
  room?: string;
  roomOwner: boolean;
  socketId: string;
  createdAt: Date;
  
  constructor(player: PlayerInterface) {
    super(player);
    this.name = player.name;
    this.roomOwner = player.roomOwner;
    this.socketId = player.socketId;
    this.createdAt = new Date();
    
    if (player.room) {
      this.room = player.room;
    }
  }
  
  static createFromCreateRoomDTO(createRoomDTO: CreateRoomDTO) {
    return new PlayerEntity({
      name: createRoomDTO.playerName,
      roomOwner: true,
      socketId: createRoomDTO.socketId
    });
  }
  
  static createFromJoinRoomDTO(joinRoomDTO: JoinRoomDTO) {
    return new PlayerEntity({
      name: joinRoomDTO.playerName,
      roomOwner: false,
      socketId: joinRoomDTO.socketId
    });
  }
}
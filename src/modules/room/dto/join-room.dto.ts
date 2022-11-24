import { RoomMessageDTO } from "modules/room/dto/room-message.dto";

export class JoinRoomDTO {
  readonly room: string;
  readonly player: string;
  readonly socketId: string;
  
  constructor(joinRoom: JoinRoomDTO) {
    this.room = joinRoom.room;
    this.player = joinRoom.player;
    this.socketId = joinRoom.socketId;
  }
  
  static fromRoomMessageDTO(roomMessage: RoomMessageDTO) {
    return new JoinRoomDTO({
      room: roomMessage.data.room.name,
      player: roomMessage.data.player.name,
      socketId: roomMessage.socketId
    });
  }
}
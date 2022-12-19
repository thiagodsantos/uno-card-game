import { RoomMessageDTO } from "modules/room/dto/room-message.dto";

export class JoinRoomDTO {
  readonly roomName: string;
  readonly playerName: string;
  readonly socketId: string;
  
  constructor(joinRoom: JoinRoomDTO) {
    this.roomName = joinRoom.roomName;
    this.playerName = joinRoom.playerName;
    this.socketId = joinRoom.socketId;
  }
  
  static fromRoomMessageDTO(roomMessage: RoomMessageDTO) {
    return new JoinRoomDTO({
      roomName: roomMessage.data.room.id,
      playerName: roomMessage.data.player.name,
      socketId: roomMessage.socketId
    });
  }
}
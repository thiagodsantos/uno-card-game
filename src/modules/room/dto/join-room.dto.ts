import { RoomMessageDTO } from "events/dto/room/room-message.dto";

export class JoinRoomDTO {
  room: string;
  player: string;
  socketId: string;
  
  constructor(joinRoom: JoinRoomDTO) {
    this.room = joinRoom.room;
    this.player = joinRoom.player;
    this.socketId = joinRoom.socketId;
  }
  
  static fromRoomMessageDTO(roomMessage: RoomMessageDTO) {
    const joinRoomDTO = new JoinRoomDTO({
      room: roomMessage.data.room.name,
      player: roomMessage.data.player.name,
      socketId: roomMessage.socketId
    });
    
    return joinRoomDTO;
  }
}
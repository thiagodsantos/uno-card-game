import { RoomMessageDTO } from 'modules/room/dto/room-message.dto';

export class CreateRoomDTO {
  readonly roomName: string;
  readonly playerName: string;
  readonly socketId: string;
  
  constructor(createRoom: CreateRoomDTO) {
    this.playerName = createRoom.playerName;
    this.roomName = createRoom.roomName;
    this.socketId = createRoom.socketId;
  }
  
  static fromRoomMessageDTO(roomMessage: RoomMessageDTO) {
    return new CreateRoomDTO({
      playerName: roomMessage.data.player.name,
      roomName: roomMessage.data.room.name,
      socketId: roomMessage.socketId
    });
  }
}
import { RoomMessageDTO } from 'modules/room/dto/room-message.dto';

export class CreateRoomDTO {
  readonly playerName: string;
  readonly socketId: string;
  
  constructor(createRoom: CreateRoomDTO) {
    this.playerName = createRoom.playerName;
    this.socketId = createRoom.socketId;
  }
  
  static fromRoomMessageDTO(roomMessage: RoomMessageDTO) {
    return new CreateRoomDTO({
      playerName: roomMessage.data.player.name,
      socketId: roomMessage.socketId
    });
  }
}
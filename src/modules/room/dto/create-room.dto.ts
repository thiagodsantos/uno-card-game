import { RoomMessageDTO } from "events/dto/room/room-message.dto";

export class CreateRoomDTO {
  readonly roomName: string;
  readonly playerName: string;
  readonly socketId: string;
  
  constructor(createRoom: CreateRoomDTO) {
    this.roomName = createRoom.roomName;
    this.playerName = createRoom.playerName;
    this.socketId = createRoom.socketId;
  }
  
  static fromRoomMessageDTO(roomMessage: RoomMessageDTO) {
    const createRoomDTO = new CreateRoomDTO({
      roomName: roomMessage.data.room.name,
      playerName: roomMessage.data.player.name,
      socketId: roomMessage.socketId
    });
    
    return createRoomDTO;
  }
}
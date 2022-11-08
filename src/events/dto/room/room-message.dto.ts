import { ROOM_EVENTS } from 'modules/room/room.enum';

export class RoomMessageDTO {
  event: ROOM_EVENTS;
  data: {
    room: {
      name: string;
    },
    player: {
      name: string;
    }
  };
  socketId: string;
}
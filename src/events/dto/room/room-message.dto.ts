export class RoomMessageDTO {
  event: string;
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
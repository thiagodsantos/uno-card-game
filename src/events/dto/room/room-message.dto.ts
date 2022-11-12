import { MessageDTO } from 'events/dto/message/message.dto';
import { DataRoomType, DataPlayerType } from 'events/dto/message-data.types';

interface RoomMessageType extends DataRoomType, DataPlayerType { }

export class RoomMessageDTO extends MessageDTO {
  data: RoomMessageType;
}
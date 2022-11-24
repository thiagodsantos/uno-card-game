import { DataPlayerType, DataRoomType } from 'shared/message-data.types';
import { MessageDTO } from 'shared/message.dto';

interface RoomMessageType extends DataRoomType, DataPlayerType {}

export class RoomMessageDTO extends MessageDTO {
  data: RoomMessageType;
}
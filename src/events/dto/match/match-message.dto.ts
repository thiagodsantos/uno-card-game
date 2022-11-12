import { MessageDTO } from 'events/dto/message/message.dto';
import { DataRoomType } from 'events/dto/message-data.types';

export class MatchMessageDTO extends MessageDTO {
  data: DataRoomType;
}
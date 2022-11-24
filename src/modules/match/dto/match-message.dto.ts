import { MessageDTO } from 'shared/message.dto';
import { DataRoomType } from 'shared/message-data.types';

export class MatchMessageDTO extends MessageDTO {
  data: DataRoomType;
}

import { DataPlayCardType, DataPlayerType, DataRoomType } from "shared/message-data.types";
import { MessageDTO } from "shared/message.dto";

interface RoomMessageType extends DataRoomType, DataPlayerType, DataPlayCardType {}

export class PlayerMessageDTO extends MessageDTO {
  data: RoomMessageType;
}
import { Cache } from "cache-manager";
import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";
import { RoomEntity } from "modules/room/room.entity";

// TODO: Use config file instead
const ROOM_TTL    = (process.env.ROOM_TTL ?? 1000) as number;
const ROOM_PREFIX = (process.env.ROOM_PREFIX ?? 'ROOM_') as string;

@Injectable()
export class RoomRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  public async store(room: RoomEntity) {
    await this.cacheManager.set(ROOM_PREFIX + room.name, room, ROOM_TTL);
    return room;
  }
  
  public async getRoom(roomName: string): Promise<RoomEntity | null> {
    const room: RoomEntity = await this.cacheManager.get(ROOM_PREFIX + roomName);
    if (!room) {
      return null;
    }
  
    return RoomEntity.load(room) as RoomEntity;
  }
}
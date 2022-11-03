import { Cache } from "cache-manager";
import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";
import { RoomEntity } from "modules/room/room.entity";

// TODO: Use config file instead
const ROOM_TTL = process.env.ROOM_TTL as unknown as number ?? 1000;

@Injectable()
export class RoomRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  public async createRoom(room: RoomEntity) {
    await this.cacheManager.set(room.name, room, ROOM_TTL);
    return room;
  }
  
  public async updateRoom(room: RoomEntity) {
    await this.cacheManager.set(room.name, room);
    return room;
  }
  
  public async getRoom(roomName: string): Promise<RoomEntity> {
    return await this.cacheManager.get(roomName);
  }
}
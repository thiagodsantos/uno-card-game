import { Inject, Injectable, CACHE_MANAGER } from "@nestjs/common";
import { Cache } from "cache-manager";

@Injectable()
export class RoomRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  public async createRoom(roomName: string) {
    return await this.cacheManager.set(roomName, { name: roomName, created: new Date() }, process.env.ROOM_TTL as unknown as number ?? 1000);
  }
  
  public async getRoom(roomName: string) {
    return await this.cacheManager.get(roomName);
  }
  
  public async removeRoom(roomName: string) {
    return await this.cacheManager.del(roomName);
  }
}
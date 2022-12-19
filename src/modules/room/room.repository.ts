import { Cache } from 'cache-manager';
import { ROOM_PREFIX, ROOM_TTL } from 'env-vars';
import { Inject, Injectable, CACHE_MANAGER, InternalServerErrorException } from '@nestjs/common';
import { RoomEntity } from 'modules/room/room.entity';

@Injectable()
export class RoomRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  public async store(room: RoomEntity) {
    try {
      await this.cacheManager.set(ROOM_PREFIX + room.name, room, ROOM_TTL);
      return room;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  public async getRoomByName(name: string): Promise<RoomEntity | null> {
    try {
      const room: RoomEntity = await this.cacheManager.get(ROOM_PREFIX + name);
      if (!room) {
        return null;
      }
  
      return RoomEntity.load(room) as RoomEntity;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
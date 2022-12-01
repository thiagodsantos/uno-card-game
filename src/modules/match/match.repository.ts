import { Cache } from 'cache-manager';
import { MATCH_PREFIX, MATCH_TTL } from 'env-vars';
import { CACHE_MANAGER, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { MatchEntity } from 'modules/match/match.entity';

@Injectable()
export class MatchRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  public async store(match: MatchEntity): Promise<void> {
    try {
      await this.cacheManager.set(MATCH_PREFIX + match.room.name, match, MATCH_TTL);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  
  public async getMatchByRoomName(roomName: string): Promise<MatchEntity> {
    try {
      return await this.cacheManager.get(MATCH_PREFIX + roomName);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
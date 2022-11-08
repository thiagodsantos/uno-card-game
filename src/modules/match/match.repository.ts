import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { MatchEntity } from 'modules/match/match.entity';

const MATCH_TTL    = (process.env.MATCH_TTL ?? 1000) as number;
const MATCH_PREFIX = (process.env.MATCH_PREFIX ?? 'MATCH_') as string;

@Injectable()
export class MatchRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  
  public async createMatch(match: MatchEntity) {
    await this.cacheManager.set(MATCH_PREFIX + match.room.name, match, MATCH_TTL);
    return true;
  }
  
  public async getMatch(roomName: string): Promise<MatchEntity> {
    return await this.cacheManager.get(MATCH_PREFIX + roomName);
  }
}
import { Cache } from 'cache-manager';
import { CACHE_MANAGER, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PLAYER_PREFIX, PLAYER_TTL } from 'env-vars';
import { PlayerEntity } from 'modules/player/player.entity';

@Injectable()
export class PlayerRepository {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * @param {PlayerEntity} player
   */
  public async store(player: PlayerEntity): Promise<void> {
    try {
      await this.cacheManager.set(PLAYER_PREFIX + player.socketId, player, PLAYER_TTL);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}

import type { ClientOpts } from 'redis';
import { CacheModule } from '@nestjs/common';
import { redisStore } from 'cache-manager-redis-store';
import { REDIS_HOST, REDIS_PORT } from 'env-vars';

const redis = CacheModule.register<ClientOpts>({
  store: async () => await redisStore({
    socket: {
      host: REDIS_HOST,
      port: REDIS_PORT
    }
  })
});

export default redis;
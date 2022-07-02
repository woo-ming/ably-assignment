import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

const { CACHE_HOST, CACHE_PORT } = process.env;

export default registerAs('cache', () => {
  return {
    store: redisStore,
    host: CACHE_HOST as string,
    port: +(CACHE_PORT as string),
    ttl: 0,
  };
});

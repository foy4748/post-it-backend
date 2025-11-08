import { createClient } from 'redis';
import config from '../config';

export const redisClient = createClient({
  username: config.redisUser,
  password: config.redisPassword,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
  },
});

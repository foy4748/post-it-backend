import { createClient } from 'redis';
import config from '../config';
import Bull from 'bull';

export const redisClient = createClient({
  username: config.redisUser,
  password: config.redisPassword,
  socket: {
    host: config.redisHost,
    port: Number(config.redisPort),
  },
});

export const redisForBull: Bull.QueueOptions = {
  redis: {
    username: config.redisUser,
    password: config.redisPassword,
    host: config.redisHost,
    port: Number(config.redisPort),
  },
  defaultJobOptions: {
    attempts: 3, // 2 retries + 1 initial attempt
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  },
};

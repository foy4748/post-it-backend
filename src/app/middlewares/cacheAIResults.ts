import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../utils/redisClient';

class RedisCacheHandler {
  public async connect() {
    await redisClient.connect();
  }

  public cacheHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      const redisId = String(req.params.id);

      if (redisId) {
        const isExist = await redisClient.exists(redisId);
        if (isExist === 1) {
          const previousResult = await redisClient.get(redisId);
          return res.send({
            summary: previousResult,
            cachedResult: true,
          });
        } else {
          next();
        }
      } else {
        next();
      }
    };
  }
}

export default RedisCacheHandler;

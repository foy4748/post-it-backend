import { JwtPayload } from 'jsonwebtoken';
import { TThreadPayload } from './thread.interface';
import { Thread } from './thread.model';

export const ScreateThread = async (
  payload: TThreadPayload,
  decoded: JwtPayload,
) => {
  const newThread = { ...payload, author: decoded._id };
  const result = await Thread.create(newThread);
  global.io.emit('new-thread', result);
  return result;
};

export const SgetThreads = async () => {
  const threads = await Thread.find();
  return threads;
};

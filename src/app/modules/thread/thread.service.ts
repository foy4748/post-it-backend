import { JwtPayload } from 'jsonwebtoken';
import {
  TThreadCategoryPayload,
  TThreadPayload,
  TThreadQuery,
} from './thread.interface';
import { Thread, ThreadCategory } from './thread.model';
import threadCreationQueue from './thread.queue';

export const ScreateThreadCategory = async (
  payload: TThreadCategoryPayload,
) => {
  const result = await ThreadCategory.create(payload);
  return result;
};

export const ScreateThread = async (
  payload: TThreadPayload,
  decoded: JwtPayload,
) => {
  const newThread = { ...payload, author: decoded._id };
  const result = await Thread.create(newThread);
  await threadCreationQueue.add(result);
  global.io.emit('new-thread', result);
  return result;
};

export const SgetThreads = async (query: TThreadQuery) => {
  const threads = await Thread.find(query).populate(['author', 'category']);
  return threads;
};

export const SgetSingleThread = async (threadId: string) => {
  const threads = await Thread.findOne({ _id: threadId }).populate([
    'author',
    'category',
  ]);
  return threads;
};

export const SgetThreadCategories = async () => {
  const threadCategories = await ThreadCategory.find();
  return threadCategories;
};

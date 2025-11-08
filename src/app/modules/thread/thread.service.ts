import { JwtPayload } from 'jsonwebtoken';
import { TThreadCategoryPayload, TThreadPayload } from './thread.interface';
import { Thread, ThreadCategory } from './thread.model';

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
  global.io.emit('new-thread', result);
  return result;
};

export const SgetThreads = async () => {
  const threads = await Thread.find().populate(['author', 'category']);
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

import catchAsyncError from '../../utils/catchAsyncError';
import { TThreadQuery } from './thread.interface';
import threadCreationQueue from './thread.queue';
import {
  ScreateThread,
  ScreateThreadCategory,
  SgetThreadCategories,
  SgetThreads,
  SgetSingleThread,
  SdeleteSingleThread,
} from './thread.service';

export const CcreateThread = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const result = await ScreateThread(body, decoded);
  // await threadCreationQueue.add(result);
  return res.send(result);
});

export const CcreateThreadCategory = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await ScreateThreadCategory(body);
  return res.send(result);
});

export const CgetThreads = catchAsyncError(async (req, res) => {
  const { category, searchTerm } = req.query;
  const query: TThreadQuery = {};
  if (category && category?.length == 24) query['category'] = String(category);
  console.log(query);
  if (searchTerm) query['searchTerm'] = String(searchTerm);

  const result = await SgetThreads(query);
  return res.send(result);
});

export const CgetSingleThread = catchAsyncError(async (req, res) => {
  const threadId: string = req.params.threadId;
  const result = await SgetSingleThread(threadId);
  return res.send(result);
});

export const CgetThreadCategories = catchAsyncError(async (_, res) => {
  const result = await SgetThreadCategories();
  return res.send(result);
});

export const CdeleteSingleThread = catchAsyncError(async (req, res) => {
  const threadId: string = req.params.threadId;
  const result = await SdeleteSingleThread(threadId);
  return res.send(result);
});

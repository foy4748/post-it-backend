import catchAsyncError from '../../utils/catchAsyncError';
import threadCreationQueue from './thread.queue';
import {
  ScreateThread,
  ScreateThreadCategory,
  SgetThreadCategories,
  SgetThreads,
  SgetSingleThread,
} from './thread.service';

export const CcreateThread = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const result = await ScreateThread(body, decoded);
  await threadCreationQueue.add(result);
  return res.send(result);
});

export const CcreateThreadCategory = catchAsyncError(async (req, res) => {
  const { body } = req;
  const result = await ScreateThreadCategory(body);
  return res.send(result);
});

export const CgetThreads = catchAsyncError(async (_, res) => {
  const result = await SgetThreads();
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

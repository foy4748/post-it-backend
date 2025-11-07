import catchAsyncError from '../../utils/catchAsyncError';
import {
  ScreateThread,
  ScreateThreadCategory,
  SgetThreadCategories,
  SgetThreads,
} from './thread.service';

export const CcreateThread = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const result = await ScreateThread(body, decoded);
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

export const CgetThreadCategories = catchAsyncError(async (_, res) => {
  const result = await SgetThreadCategories();
  return res.send(result);
});

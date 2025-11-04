import catchAsyncError from '../../utils/catchAsyncError';
import { ScreateThread, SgetThreads } from './thread.service';

export const CcreateThread = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const result = await ScreateThread(body, decoded);
  return res.send(result);
});

export const CgetThreads = catchAsyncError(async (req, res) => {
  const result = await SgetThreads();
  return res.send(result);
});

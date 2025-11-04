import catchAsyncError from '../../utils/catchAsyncError';
import { ScreateThread } from './thread.service';

export const CcreateThread = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const result = await ScreateThread(body, decoded);
  return res.send(result);
});

import catchAsyncError from '../../utils/catchAsyncError';
import { ScreatePost } from './post.service';

export const CcreatePost = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const threadId = req.params.threadId;
  const result = await ScreatePost(body, decoded, threadId);
  return res.send(result);
});

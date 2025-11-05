import catchAsyncError from '../../utils/catchAsyncError';
import { ScreateComment, SgetComments } from './comment.service';

export const CcreateComment = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const postId = req.params.postId;
  const result = await ScreateComment(body, decoded, postId);
  return res.send(result);
});

export const CgetComments = catchAsyncError(async (req, res) => {
  const postId = req.params.postId;
  const result = await SgetComments(postId);
  return res.send(result);
});

import catchAsyncError from '../../utils/catchAsyncError';
import {
  ScreatePost,
  SdeleteSinglePost,
  SgetPosts,
  SgetSinglePost,
} from './post.service';

export const CcreatePost = catchAsyncError(async (req, res) => {
  const { body, decoded } = req;
  const threadId = req.params.threadId;
  const result = await ScreatePost(body, decoded, threadId);
  return res.send(result);
});

export const CgetPost = catchAsyncError(async (req, res) => {
  const threadId = req.params.threadId;
  const result = await SgetPosts(threadId);
  return res.send(result);
});

export const CgetSinglePost = catchAsyncError(async (req, res) => {
  const postId = req.params.postId;
  const result = await SgetSinglePost(postId);
  return res.send(result);
});

export const CdeleteSinglePost = catchAsyncError(async (req, res) => {
  const postId = req.params.postId;
  const result = await SdeleteSinglePost(postId);
  return res.send(result);
});

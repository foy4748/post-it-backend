import { JwtPayload } from 'jsonwebtoken';
import { TCommentPayload } from './comment.interface';
import { Comment } from './comment.model';
import commentCreationQueue from './comment.queue';

export const ScreateComment = async (
  payload: TCommentPayload,
  decoded: JwtPayload,
  postId: string,
) => {
  const newComment = { ...payload, user: decoded._id, post: postId };
  const eventName = payload?.parentComment
    ? `new-comment-${postId}-${payload?.parentComment}`
    : `new-comment-${postId}`;
  const result = await Comment.create(newComment);
  await commentCreationQueue.add(result);
  global.io.emit(eventName, result.toObject());
  return result;
};

export const SgetComments = async (postId: string) => {
  const result = await Comment.find({
    post: postId,
    parentComment: null,
  })
    .populate('user')
    .sort({ createdAt: -1 });

  return result;
};

export const SgetNestedComments = async (
  postId: string,
  parentComment: string,
) => {
  const result = await Comment.find({ post: postId, parentComment })
    .populate('user')
    .sort({ createdAt: -1 });

  return result;
};

export const SdeleteSingleComment = async (commentId: string) => {
  const result = await Comment.deleteOne({
    _id: commentId,
  });

  global.io.emit(`delete-comment`, result);
  return result;
};

import { JwtPayload } from 'jsonwebtoken';
import { TCommentPayload } from './comment.interface';
import { Comment } from './comment.model';

export const ScreateComment = async (
  payload: TCommentPayload,
  decoded: JwtPayload,
  postId: string,
) => {
  const newComment = { ...payload, user: decoded._id, post: postId };
  const result = await Comment.create(newComment);
  return result;
};

export const SgetComments = async (postId: string) => {
  const result = await Comment.find({ post: postId });

  return result;
};

import { JwtPayload } from 'jsonwebtoken';
import { TPostPayload } from './post.interface';
import { Post } from './post.model';

export const ScreatePost = async (
  payload: TPostPayload,
  decoded: JwtPayload,
  threadId: string,
) => {
  const newPost = { ...payload, author: decoded._id, thread: threadId };
  const result = await Post.create(newPost);
  return result;
};

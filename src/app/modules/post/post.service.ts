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

export const SgetPosts = async (threadId: string) => {
  const result = await Post.find({ thread: threadId });
  return result;
};

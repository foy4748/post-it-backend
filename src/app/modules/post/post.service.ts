import { JwtPayload } from 'jsonwebtoken';
import { TPostPayload } from './post.interface';
import { Post } from './post.model';
import postCreationQueue from './post.queue';

export const ScreatePost = async (
  payload: TPostPayload,
  decoded: JwtPayload,
  threadId: string,
) => {
  const newPost = { ...payload, author: decoded._id, thread: threadId };
  const result = await Post.create(newPost);

  await postCreationQueue.add(result);
  global.io.emit(`new-post-${threadId}`, result.toObject());
  return result;
};

export const SgetPosts = async (threadId: string) => {
  const result = await Post.find({ thread: threadId }).populate('author');
  return result;
};

export const SgetSinglePost = async (postId: string) => {
  const post = await Post.findOne({ _id: postId }).populate(['author']);
  return post;
};

export const SdeleteSinglePost = async (postId: string) => {
  const result = await Post.deleteOne({ _id: postId });
  global.io.emit(`delete-post`);
  return result;
};

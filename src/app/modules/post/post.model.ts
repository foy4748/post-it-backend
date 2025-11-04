// models/Post.ts
import { Schema, model } from 'mongoose';
import { IPost } from './post.interface';

const postSchema = new Schema<IPost>(
  {
    content: {
      type: String,
      required: [true, 'Post content is required'],
      minlength: [1, 'Post content cannot be empty'],
      maxlength: [5000, 'Post content cannot exceed 5000 characters'],
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'Thread',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Post = model<IPost>('Post', postSchema);

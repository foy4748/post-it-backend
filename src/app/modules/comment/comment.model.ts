import { Schema, model } from 'mongoose';
import { IComment } from './comment.interface';

const CommentSchema = new Schema<IComment>({
  content: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference to your User model
    required: true,
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post', // Reference to your Post model
    required: true,
  },
  parentComment: {
    type: Schema.Types.ObjectId,
    ref: 'Comment', // Self-reference for nested comments
    default: null, // Top-level comments have no parent
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Comment = model('Comment', CommentSchema);

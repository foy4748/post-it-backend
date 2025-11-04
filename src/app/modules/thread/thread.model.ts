// models/Thread.ts
import { Schema, model } from 'mongoose';
import { IThread } from './thread.interface';

const threadSchema = new Schema<IThread>(
  {
    title: {
      type: String,
      required: [true, 'Thread title is required'],
      trim: true,
      minlength: [5, 'Thread title must be at least 5 characters'],
      maxlength: [200, 'Thread title cannot exceed 200 characters'],
    },
    content: {
      type: String,
      required: [true, 'Thread content is required'],
      minlength: [10, 'Thread content must be at least 10 characters'],
      maxlength: [10000, 'Thread content cannot exceed 10000 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Category',
    //   required: true,
    // },
    // tags: [
    //   {
    //     type: String,
    //     trim: true,
    //     lowercase: true,
    //     maxlength: [20, 'Tag cannot exceed 20 characters'],
    //   },
    // ],
    // status: {
    //   type: String,
    //   enum: ['active', 'closed', 'archived', 'flagged'],
    //   default: 'active',
    // },
    // visibility: {
    //   type: String,
    //   enum: ['public', 'private', 'members_only'],
    //   default: 'public',
    // },
    // viewCount: { type: Number, default: 0 },
    // postCount: { type: Number, default: 0 },
    // isPinned: { type: Boolean, default: false },
    // isLocked: { type: Boolean, default: false },
    // lastActivityAt: { type: Date, default: Date.now },
    // featuredImage: String,
  },
  {
    timestamps: true,
  },
);

export const Thread = model<IThread>('Thread', threadSchema);

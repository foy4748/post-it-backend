import { Document, Types } from 'mongoose';

export type TThreadPayload = {
  title: string;
  content: string;
  category: Types.ObjectId;
};

export interface IThread extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  // category: Types.ObjectId;
  // tags: string[];
  // status: 'active' | 'closed' | 'archived' | 'flagged';
  // visibility: 'public' | 'private' | 'members_only';
  // viewCount: number;
  // postCount: number;
  // isPinned: boolean;
  // isLocked: boolean;
  // lastActivityAt: Date;
  // featuredImage?: string;
  // moderation: IModerationResult;
  // participants: Types.ObjectId[]; // Users who participated in the thread
  // followers: Types.ObjectId[]; // Users following this thread
  createdAt: Date;
  updatedAt: Date;
}

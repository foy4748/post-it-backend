import { Document, Types } from 'mongoose';

export type TCommentPayload = {
  content: string;
  parentComment?: Types.ObjectId | null;
};

// Interface for Comment document
export interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
  isFlagged?: boolean;
  parentComment?: Types.ObjectId | null;
  createdAt: Date;
}

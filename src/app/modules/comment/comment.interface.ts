import { Document, Types } from 'mongoose';

// Interface for Comment document
export interface IComment extends Document {
  content: string;
  user: Types.ObjectId;
  post: Types.ObjectId;
  parentComment?: Types.ObjectId | null;
  createdAt: Date;
}

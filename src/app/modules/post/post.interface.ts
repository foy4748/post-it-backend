import { Document, Types } from 'mongoose';
export type TPostPayload = {
  content: string;
};
export interface IPost extends Document {
  content: string;
  author: Types.ObjectId;
  thread: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

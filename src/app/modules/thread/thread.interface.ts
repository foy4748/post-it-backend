import { Document, Types } from 'mongoose';

export type TThreadQuery = {
  category?: string;
  searchTerm?: string;
};

export type TThreadPayload = {
  title: string;
  content: string;
  category: Types.ObjectId;
};

export type TThreadCategoryPayload = {
  category: string;
};

export interface IThreadCategory extends Document {
  category: string;
}

export interface IThread extends Document {
  title: string;
  content: string;
  author: Types.ObjectId;
  category: Types.ObjectId;
  isFlagged: boolean;
  createdAt: Date;
  updatedAt: Date;
}

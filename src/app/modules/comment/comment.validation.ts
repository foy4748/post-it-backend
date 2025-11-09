import { z } from 'zod';
import bull from 'bull';
import { redisForBull } from '../../utils/redisClient';
import { contentExplicitValidationAI } from '../content/content.validation';
import { Comment } from './comment.model';

const commentCreationQueue = new bull('commentCreationQueue', redisForBull);

commentCreationQueue.process(async ({ data }) => {
  const result = await contentExplicitValidationAI(data.content);
  if (result.is_safe === false) {
    await Comment.updateOne({ _id: data._id }, { isFlagged: true });
    global.io.emit(`explicit-comment-${data._id}`);
  }
});

export const commentValidationSchema = z.object({
  content: z
    .string()
    .min(10, 'Comment content must be at least 10 characters')
    .max(2500, 'Comment content cannot exceed 2500 characters'),
  parentComment: z
    .string()
    .regex(/^[a-fA-F0-9]{24}$/, 'Invalid category ID format')
    .optional(), // ObjectId validation
});

export default commentCreationQueue;

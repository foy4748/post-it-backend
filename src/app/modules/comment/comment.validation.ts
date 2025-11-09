import { z } from 'zod';

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

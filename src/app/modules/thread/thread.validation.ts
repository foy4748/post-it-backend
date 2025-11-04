import { z } from 'zod';

export const threadValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, 'Thread title must be at least 5 characters')
    .max(200, 'Thread title cannot exceed 200 characters'),

  content: z
    .string()
    .min(10, 'Thread content must be at least 10 characters')
    .max(10000, 'Thread content cannot exceed 10000 characters'),

  // category: z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid category ID format'), // ObjectId validation
});

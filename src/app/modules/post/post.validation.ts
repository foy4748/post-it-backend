import { z } from 'zod';

export const postValidationSchema = z.object({
  content: z
    .string()
    .min(10, 'Post content must be at least 10 characters')
    .max(5000, 'Post content cannot exceed 5000 characters'),
});

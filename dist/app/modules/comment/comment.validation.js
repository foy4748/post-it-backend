"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentValidationSchema = void 0;
const zod_1 = require("zod");
exports.commentValidationSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(10, 'Comment content must be at least 10 characters')
        .max(2500, 'Comment content cannot exceed 2500 characters'),
    parentComment: zod_1.z
        .string()
        .regex(/^[a-fA-F0-9]{24}$/, 'Invalid category ID format')
        .optional(), // ObjectId validation
});

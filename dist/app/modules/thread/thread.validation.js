"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadCategoryValidationSchema = exports.threadValidationSchema = void 0;
const zod_1 = require("zod");
exports.threadValidationSchema = zod_1.z.object({
    title: zod_1.z
        .string()
        .trim()
        .min(5, 'Thread title must be at least 5 characters')
        .max(200, 'Thread title cannot exceed 200 characters'),
    content: zod_1.z
        .string()
        .min(10, 'Thread content must be at least 10 characters')
        .max(10000, 'Thread content cannot exceed 10000 characters'),
    category: zod_1.z.string().regex(/^[a-fA-F0-9]{24}$/, 'Invalid category ID format'), // ObjectId validation
});
exports.threadCategoryValidationSchema = zod_1.z.object({
    category: zod_1.z
        .string()
        .trim()
        .min(3, 'Thread category must be at least 3 characters')
        .max(80, 'Thread category name cannot exceed 80 characters'),
});

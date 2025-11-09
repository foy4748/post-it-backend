"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidationSchema = void 0;
const zod_1 = require("zod");
exports.postValidationSchema = zod_1.z.object({
    content: zod_1.z
        .string()
        .min(10, 'Post content must be at least 10 characters')
        .max(5000, 'Post content cannot exceed 5000 characters'),
});

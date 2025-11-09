"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Thread = exports.ThreadCategory = void 0;
// models/Thread.ts
const mongoose_1 = require("mongoose");
const threadCategorySchema = new mongoose_1.Schema({
    category: {
        type: String,
        required: [true, 'Category is required'],
        trim: true,
        minlength: [3, 'Thread category name must be at least 3 characters'],
        maxlength: [80, 'Thread category name cannot exceed 80 characters'],
    },
});
const threadSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Thread title is required'],
        trim: true,
        minlength: [5, 'Thread title must be at least 5 characters'],
        maxlength: [200, 'Thread title cannot exceed 200 characters'],
    },
    content: {
        type: String,
        required: [true, 'Thread content is required'],
        minlength: [10, 'Thread content must be at least 10 characters'],
        maxlength: [10000, 'Thread content cannot exceed 10000 characters'],
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'ThreadCategory',
        required: true,
    },
    isFlagged: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ThreadCategory = (0, mongoose_1.model)('ThreadCategory', threadCategorySchema);
exports.Thread = (0, mongoose_1.model)('Thread', threadSchema);

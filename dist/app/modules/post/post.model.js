"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
// models/Post.ts
const mongoose_1 = require("mongoose");
const postSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: [true, 'Post content is required'],
        minlength: [1, 'Post content cannot be empty'],
        maxlength: [5000, 'Post content cannot exceed 5000 characters'],
        trim: true,
    },
    author: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    thread: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Thread',
        required: true,
    },
    isFlagged: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.Post = (0, mongoose_1.model)('Post', postSchema);

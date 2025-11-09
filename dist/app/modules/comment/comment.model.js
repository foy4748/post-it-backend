"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const CommentSchema = new mongoose_1.Schema({
    content: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User', // Reference to your User model
        required: true,
    },
    post: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Post', // Reference to your Post model
        required: true,
    },
    parentComment: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Comment', // Self-reference for nested comments
        default: null, // Top-level comments have no parent
    },
    isFlagged: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.Comment = (0, mongoose_1.model)('Comment', CommentSchema);

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SdeleteSingleComment = exports.SgetNestedComments = exports.SgetComments = exports.ScreateComment = void 0;
const comment_model_1 = require("./comment.model");
const comment_queue_1 = __importDefault(require("./comment.queue"));
const ScreateComment = (payload, decoded, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = Object.assign(Object.assign({}, payload), { user: decoded._id, post: postId });
    const eventName = (payload === null || payload === void 0 ? void 0 : payload.parentComment)
        ? `new-comment-${postId}-${payload === null || payload === void 0 ? void 0 : payload.parentComment}`
        : `new-comment-${postId}`;
    const result = yield comment_model_1.Comment.create(newComment);
    yield comment_queue_1.default.add(result);
    global.io.emit(eventName, result.toObject());
    return result;
});
exports.ScreateComment = ScreateComment;
const SgetComments = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.find({
        post: postId,
        parentComment: null,
    }).populate('user');
    return result;
});
exports.SgetComments = SgetComments;
const SgetNestedComments = (postId, parentComment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.find({ post: postId, parentComment }).populate('user');
    return result;
});
exports.SgetNestedComments = SgetNestedComments;
const SdeleteSingleComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_model_1.Comment.deleteOne({
        _id: commentId,
    });
    global.io.emit(`delete-comment`, result);
    return result;
});
exports.SdeleteSingleComment = SdeleteSingleComment;

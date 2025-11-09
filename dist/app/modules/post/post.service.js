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
exports.SdeleteSinglePost = exports.SgetSinglePost = exports.SgetPosts = exports.ScreatePost = void 0;
const post_model_1 = require("./post.model");
const post_queue_1 = __importDefault(require("./post.queue"));
const ScreatePost = (payload, decoded, threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const newPost = Object.assign(Object.assign({}, payload), { author: decoded._id, thread: threadId });
    const result = yield post_model_1.Post.create(newPost);
    yield post_queue_1.default.add(result);
    global.io.emit(`new-post-${threadId}`);
    return result;
});
exports.ScreatePost = ScreatePost;
const SgetPosts = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.find({ thread: threadId }).populate('author');
    return result;
});
exports.SgetPosts = SgetPosts;
const SgetSinglePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield post_model_1.Post.findOne({ _id: postId }).populate([
        'author',
        'category',
    ]);
    return post;
});
exports.SgetSinglePost = SgetSinglePost;
const SdeleteSinglePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield post_model_1.Post.deleteOne({ _id: postId });
    global.io.emit(`delete-post`);
    return result;
});
exports.SdeleteSinglePost = SdeleteSinglePost;

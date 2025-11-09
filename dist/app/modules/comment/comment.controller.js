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
exports.CdeleteSingleComment = exports.CgetNestedComments = exports.CgetComments = exports.CcreateComment = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const comment_service_1 = require("./comment.service");
exports.CcreateComment = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, decoded } = req;
    const postId = req.params.postId;
    const result = yield (0, comment_service_1.ScreateComment)(body, decoded, postId);
    return res.send(result);
}));
exports.CgetComments = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const result = yield (0, comment_service_1.SgetComments)(postId);
    return res.send(result);
}));
exports.CgetNestedComments = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const parentCommentId = req.params.parentComment;
    const result = yield (0, comment_service_1.SgetNestedComments)(postId, parentCommentId);
    return res.send(result);
}));
exports.CdeleteSingleComment = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentId = req.params.commentId;
    const result = yield (0, comment_service_1.SdeleteSingleComment)(commentId);
    return res.send(result);
}));

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
exports.CdeleteSinglePost = exports.CgetSinglePost = exports.CgetPost = exports.CcreatePost = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const post_service_1 = require("./post.service");
exports.CcreatePost = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, decoded } = req;
    const threadId = req.params.threadId;
    const result = yield (0, post_service_1.ScreatePost)(body, decoded, threadId);
    return res.send(result);
}));
exports.CgetPost = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const threadId = req.params.threadId;
    const result = yield (0, post_service_1.SgetPosts)(threadId);
    return res.send(result);
}));
exports.CgetSinglePost = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const result = yield (0, post_service_1.SgetSinglePost)(postId);
    return res.send(result);
}));
exports.CdeleteSinglePost = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.postId;
    const result = yield (0, post_service_1.SdeleteSinglePost)(postId);
    return res.send(result);
}));

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
exports.SdeleteSingleThread = exports.SgetThreadCategories = exports.SgetSingleThread = exports.SgetThreads = exports.ScreateThread = exports.ScreateThreadCategory = void 0;
const thread_model_1 = require("./thread.model");
const thread_queue_1 = __importDefault(require("./thread.queue"));
const ScreateThreadCategory = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield thread_model_1.ThreadCategory.create(payload);
    return result;
});
exports.ScreateThreadCategory = ScreateThreadCategory;
const ScreateThread = (payload, decoded) => __awaiter(void 0, void 0, void 0, function* () {
    const newThread = Object.assign(Object.assign({}, payload), { author: decoded._id });
    const result = yield thread_model_1.Thread.create(newThread);
    yield thread_queue_1.default.add(result);
    global.io.emit('new-thread', result);
    return result;
});
exports.ScreateThread = ScreateThread;
const SgetThreads = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const threads = yield thread_model_1.Thread.find(query).populate(['author', 'category']);
    return threads;
});
exports.SgetThreads = SgetThreads;
const SgetSingleThread = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const threads = yield thread_model_1.Thread.findOne({ _id: threadId }).populate([
        'author',
        'category',
    ]);
    return threads;
});
exports.SgetSingleThread = SgetSingleThread;
const SgetThreadCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const threadCategories = yield thread_model_1.ThreadCategory.find();
    return threadCategories;
});
exports.SgetThreadCategories = SgetThreadCategories;
const SdeleteSingleThread = (threadId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield thread_model_1.Thread.deleteOne({ _id: threadId });
    global.io.emit(`delete-thread-${threadId}`, result);
    return result;
});
exports.SdeleteSingleThread = SdeleteSingleThread;

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
exports.CdeleteSingleThread = exports.CgetThreadCategories = exports.CgetSingleThread = exports.CgetThreads = exports.CcreateThreadCategory = exports.CcreateThread = void 0;
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const thread_queue_1 = __importDefault(require("./thread.queue"));
const thread_service_1 = require("./thread.service");
exports.CcreateThread = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, decoded } = req;
    const result = yield (0, thread_service_1.ScreateThread)(body, decoded);
    yield thread_queue_1.default.add(result);
    return res.send(result);
}));
exports.CcreateThreadCategory = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const result = yield (0, thread_service_1.ScreateThreadCategory)(body);
    return res.send(result);
}));
exports.CgetThreads = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { category, searchTerm } = req.query;
    const query = {};
    if (category && (category === null || category === void 0 ? void 0 : category.length) == 24)
        query['category'] = String(category);
    console.log(query);
    if (searchTerm)
        query['searchTerm'] = String(searchTerm);
    const result = yield (0, thread_service_1.SgetThreads)(query);
    return res.send(result);
}));
exports.CgetSingleThread = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const threadId = req.params.threadId;
    const result = yield (0, thread_service_1.SgetSingleThread)(threadId);
    return res.send(result);
}));
exports.CgetThreadCategories = (0, catchAsyncError_1.default)((_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, thread_service_1.SgetThreadCategories)();
    return res.send(result);
}));
exports.CdeleteSingleThread = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const threadId = req.params.threadId;
    const result = yield (0, thread_service_1.SdeleteSingleThread)(threadId);
    return res.send(result);
}));

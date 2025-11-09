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
const bull_1 = __importDefault(require("bull"));
const redisClient_1 = require("../../utils/redisClient");
const content_validation_1 = require("../content/content.validation");
const thread_model_1 = require("./thread.model");
const threadCreationQueue = new bull_1.default('threadCreationQueue', redisClient_1.redisForBull);
threadCreationQueue.process((_a) => __awaiter(void 0, [_a], void 0, function* ({ data }) {
    const result = yield (0, content_validation_1.contentExplicitValidationAI)(`${data === null || data === void 0 ? void 0 : data.title} ${data === null || data === void 0 ? void 0 : data.content}`);
    if (result.is_safe === false) {
        yield thread_model_1.Thread.updateOne({ _id: data._id }, { isFlagged: true });
        global.io.emit(`explicit-thread-${data._id}`);
    }
}));
exports.default = threadCreationQueue;

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
exports.CmoderatePost = exports.CSummarize = void 0;
const config_1 = __importDefault(require("../../config"));
const catchAsyncError_1 = __importDefault(require("../../utils/catchAsyncError"));
const genai_1 = require("@google/genai");
const thread_model_1 = require("../thread/thread.model");
const redisClient_1 = require("../../utils/redisClient");
const content_validation_1 = require("./content.validation");
exports.CSummarize = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config_1.default.gemini_key;
    if (!apiKey) {
        throw new Error('GOOGLE_GEMINI_API_KEY is not set.');
    }
    const ai = new genai_1.GoogleGenAI({ apiKey });
    const id = req.params.id;
    const thread = yield thread_model_1.Thread.findOne({ _id: id });
    try {
        // Use the generative model
        // Define a clear instruction for the model
        const prompt = `
            Analyze the following text then generate summary. Return a JSON response with:
			 - summary

            Text: "${thread === null || thread === void 0 ? void 0 : thread.content}"

            Return ONLY valid JSON, no other text. absolutely json
`;
        const response = yield ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt,
        });
        // The Gemini API also has built-in safety filters you can configure
        // This is a more direct way to get model's analysis
        // You would typically process the text to parse the JSON and return it
        const result = String(response.text)
            .replace('```json', '')
            .replace('```', '');
        const jsonResult = JSON.parse(result);
        // await redisClient.connect();
        redisClient_1.redisClient.set(id, jsonResult.summary);
        return res.send(result);
    }
    catch (error) {
        console.error('Gemini API error:', error);
        return res.status(500).json({ error: 'Failed to summarize.' });
    }
}));
exports.CmoderatePost = (0, catchAsyncError_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // The Gemini API also has built-in safety filters you can configure
    // This is a more direct way to get model's analysis
    // You would typically process the text to parse the JSON and return it
    try {
        const { postContent } = req.body;
        const result = yield (0, content_validation_1.contentExplicitValidationAI)(postContent);
        if (result.error) {
            return res.status(500).json({ error: 'Failed to moderate post.' });
        }
        return res.send(result);
    }
    catch (error) {
        // console.error('Gemini API error:', error);
        return res.status(500).json({ error: 'Failed to moderate post.' });
    }
}));

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
exports.contentExplicitValidationAI = void 0;
const config_1 = __importDefault(require("../../config"));
const genai_1 = require("@google/genai");
const contentExplicitValidationAI = (postContent) => __awaiter(void 0, void 0, void 0, function* () {
    const apiKey = config_1.default.gemini_key;
    if (!apiKey) {
        throw new Error('GOOGLE_GEMINI_API_KEY is not set.');
    }
    const ai = new genai_1.GoogleGenAI({ apiKey });
    try {
        // const { postContent } = req.body;
        // Use the generative model
        // Define a clear instruction for the model
        const prompt = `
            Analyze the following text for inappropriate , spam or jibberish content. Return a JSON response with:
            - is_safe: boolean (true if safe, false if unsafe)
            - categories: array of violated categories (hate_speech, harassment, explicit, violence, self_harm, spam, jibberish, none)
            - confidence: number between 0-1
            - reasons: array of specific reasons for moderation
            - severity: "low", "medium", "high", or "none"

            Text: "${postContent}"

            Return ONLY valid JSON, no other text. absolutely json
`;
        const response = yield ai.models.generateContent({
            model: 'gemini-2.0-flash-001',
            contents: prompt,
        });
        return JSON.parse(String(response.text).replace('```json', '').replace('```', ''));
    }
    catch (error) {
        console.error('Gemini API error:', error);
        return {
            error: true,
        };
    }
});
exports.contentExplicitValidationAI = contentExplicitValidationAI;

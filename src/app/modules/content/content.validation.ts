import config from '../../config';
import { GoogleGenAI } from '@google/genai';

export const contentExplicitValidationAI = async (postContent: string) => {
  const apiKey = config.gemini_key;
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not set.');
  }
  const ai = new GoogleGenAI({ apiKey });

  try {
    // const { postContent } = req.body;

    // Use the generative model

    // Define a clear instruction for the model
    const prompt = `
            Analyze the following text for inappropriate content. Return a JSON response with:
            - is_safe: boolean (true if safe, false if unsafe)
            - categories: array of violated categories (hate_speech, harassment, explicit, violence, self_harm, spam, none)
            - confidence: number between 0-1
            - reasons: array of specific reasons for moderation
            - severity: "low", "medium", "high", or "none"

            Text: "${postContent}"

            Return ONLY valid JSON, no other text. absolutely json
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    return JSON.parse(
      String(response.text).replace('```json', '').replace('```', ''),
    );
  } catch (error) {
    console.error('Gemini API error:', error);
    return {
      error: true,
    };
  }
};

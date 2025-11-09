import config from '../../config';
import catchAsyncError from '../../utils/catchAsyncError';
import { GoogleGenAI } from '@google/genai';
import { Thread } from '../thread/thread.model';
import { redisClient } from '../../utils/redisClient';
import { contentExplicitValidationAI } from './content.validation';

export const CSummarize = catchAsyncError(async (req, res) => {
  const apiKey = config.gemini_key;
  if (!apiKey) {
    throw new Error('GOOGLE_GEMINI_API_KEY is not set.');
  }
  const ai = new GoogleGenAI({ apiKey });
  const id = req.params.id;
  const thread = await Thread.findOne({ _id: id });

  try {
    // Use the generative model

    // Define a clear instruction for the model
    const prompt = `
            Analyze the following text then generate summary. Return a JSON response with:
			 - summary

            Text: "${thread?.content}"

            Return ONLY valid JSON, no other text. absolutely json
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      contents: prompt,
    });

    // The Gemini API also has built-in safety filters you can configure
    // This is a more direct way to get model's analysis
    // You would typically process the text to parse the JSON and return it

    const result = String(response.text)
      .replace('```json', '')
      .replace('```', '');

    const jsonResult: { summary: string } = JSON.parse(result);
    // await redisClient.connect();
    redisClient.set(id, jsonResult.summary);

    return res.send(result);
  } catch (error) {
    console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to summarize.' });
  }
});

export const CmoderatePost = catchAsyncError(async (req, res) => {
  // The Gemini API also has built-in safety filters you can configure
  // This is a more direct way to get model's analysis
  // You would typically process the text to parse the JSON and return it
  try {
    const { postContent } = req.body;
    const result = await contentExplicitValidationAI(postContent);

    if (result.error) {
      return res.status(500).json({ error: 'Failed to moderate post.' });
    }

    return res.send(result);
  } catch (error) {
    // console.error('Gemini API error:', error);
    return res.status(500).json({ error: 'Failed to moderate post.' });
  }
});

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error(
    "Missing API key. Set GEMINI_API_KEY or OPENAI_API_KEY."
  );
}

const genAI = new GoogleGenerativeAI(apiKey);

export const getModel = (modelName = "gemini-1.5-flash") => {
  return genAI.getGenerativeModel({ model: modelName });
};

export default genAI;

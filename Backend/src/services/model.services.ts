import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";
import config from "../config/config.js";

/**gemini ai model */
export const geminiModel = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: config.GOOGLE_API,
});

/**mistral ai model */
export const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API,
});

/**cohere ai model  */
export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  temperature: 0,
  maxRetries: 2,
  apiKey: config.COHERE_API,
});

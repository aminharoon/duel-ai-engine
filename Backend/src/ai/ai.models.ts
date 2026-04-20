import { ChatCohere } from "@langchain/cohere";
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { config } from "../config/config.js";

export const googleModel = new ChatGoogle({
  model: "gemini-flash-latest",
  apiKey: config.GOOGLE_API,
});
export const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API,
});
export const cohereModel = new ChatCohere({
  model: "cohere-command-a-03-2025",
  apiKey: config.CHORE_API,
});

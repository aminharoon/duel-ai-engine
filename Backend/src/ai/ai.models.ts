import { ChatCohere } from "@langchain/cohere";
import { ChatGoogle } from "@langchain/google";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatGroq } from "@langchain/groq";
import { config } from "../config/config.js";

// export const googleModel = new ChatGoogle({
//   model: "gemini-2.5-lash-TS",
//   // model: "gemini-2.5-flash",
//   apiKey: config.GOOGLE_API,
// });

export const googleModel = new ChatGroq({
  model: "meta-llama/llama-4-scout-17b-16e-instruct",
  apiKey: config.GORQ_API,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-medium-latest",
  apiKey: config.MISTRAL_API,
});
export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: config.COHERE_API,
});

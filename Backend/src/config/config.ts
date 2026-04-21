import dotenv from "dotenv";
dotenv.config();
export const config = {
  GOOGLE_API: process.env.GOOGLE_API || "",
  MISTRAL_API: process.env.MISTRAL_API || "",
  COHERE_API: process.env.COHERE_API || "",
  GORQ_API: process.env.GORQ_API || "",
};

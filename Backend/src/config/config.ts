import dotenv from "dotenv";
dotenv.config();

type CONFIG = {
  readonly GOOGLE_API: string;
  readonly MISTRAL_API: string;
  readonly COHERE_API: string;
};

const config: CONFIG = {
  GOOGLE_API: process.env.GOOGLE_API || "",
  MISTRAL_API: process.env.MISTRAL_API || "",
  COHERE_API: process.env.COHERE_API || "",
};
export default config;

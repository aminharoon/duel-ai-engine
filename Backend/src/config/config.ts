import dotenv from "dotenv";
dotenv.config();
export const config = {
  GOOGLE_API: process.env.GOOGLE_API || "",
  MISTRAL_API: process.env.MISTRAL_API || "",
  CHORE_API: process.env.CHORE_API || "",
};

import express from "express";
import cors from "cors";
import { useGraph } from "./ai/graph.ai.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  }),
);
app.post("/get-battle-results", async (req, res) => {
  const problem = req.body.problem;
  const result = await useGraph(problem);
  res.status(200).json(result);
});

export default app;

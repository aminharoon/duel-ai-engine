import express from "express";
import { useGraph } from "./ai/graph.ai.js";

const app = express();
app.get("/", (req, res) => {
  res.status(200).json({ status: "Ok" });
});

app.post("/getResponse", async (req, res) => {
  const result = await useGraph(
    "write an code in the js to compute the factorial of the number ",
  );
  res.status(200).json(result);
});

export default app;

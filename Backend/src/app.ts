import express from "express";
import { getResponse } from "./services/grap.ai.services.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});
app.post("/sendMessage", async (req, res) => {
  try {
    await getResponse(
      "write an code in the js to compute the factorial of an number  ",
    );
  } catch (e) {
    console.log(
      "something went wrong while calling the get response function i hope you dot mind ",
    );
  }
});

export default app;

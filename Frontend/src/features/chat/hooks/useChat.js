import { useState } from "react";
import { chatService } from "../services/chatService";

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setError(null);
    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const results = await chatService.getBattleResults(input);

      const aiMessage = {
        role: "battle_result",
        solution1: results.solution_1,
        solution2: results.solution_2,
        solution1Score: results.judge.solution_1_score,
        solution2Score: results.judge.solution_2_score,
        solution1Feedback: results.judge.solution_1_feedBack,
        solution2Feedback: results.judge.solution_2_feedBack,
        judgeResult: results.judge.recommendation,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {

      setError(err.message || "Failed to connect to the arena. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    error,
    setError,
    sendMessage,
  };
};

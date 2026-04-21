import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

export const chatService = {
  getBattleResults: async (problem) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock data based on the problem
    try {
      const response = await api.post("/", { problem })
      return response.data;
    } catch (e) {
      console.error(`Backend API error: ${e.message}`);
      throw new Error(e.response?.data?.message || e.message || "Server is unreachable. Please check your connection.");
    }



    // return {
    //   solution1: `AI 1 proposes a solution for: "${problem}". \n\nThis approach focuses on efficiency and scalability by implementing a distributed architecture.`,
    //   solution2: `AI 2 proposes a solution for: "${problem}". \n\nThis approach prioritizes simplicity and maintainability by using a monolithic structure with clean code principles.`,
    //   solution1Score: 85,
    //   solution2Score: 92,
    //   solution1Feedback: "Excellent scalability and performance considerations. However, the complexity might be overkill for smaller teams.",
    //   solution2Feedback: "Outstanding clarity and maintainability. Perfectly balanced for the given problem context with minimal technical debt.",
    //   judgeResult: "AI 2 is recommended for its focus on long-term maintainability, which is crucial for the given problem context."
    // };
  },
};

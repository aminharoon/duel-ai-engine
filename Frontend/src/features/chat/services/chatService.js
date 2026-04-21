import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true
})

export const chatService = {
  getBattleResults: async (problem) => {

    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {

      const response = await api.post("/get-battle-results", { problem });

      return response.data;
    } catch (e) {
      console.error(`Backend API error: ${e.message}`);
      throw new Error(e.response?.data?.message || e.message || "Server is unreachable. Please check your connection.");
    }




  },
};

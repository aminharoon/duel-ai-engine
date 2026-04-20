import axios from 'axios';


const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})

export async function fetchBattleResult(problem) {
  try {
    const res = await api.post("/", { problem });
    console.log("Raw API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching battle result:", error);
    throw error;
  }
} 

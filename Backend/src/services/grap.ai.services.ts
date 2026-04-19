import {
  StateSchema,
  MessagesValue,
  GraphNode,
  StateGraph,
  START,
  END,
} from "@langchain/langgraph";

type JUDGEMENT = {
  winner: "solution_1" | " soulution_2";
  solution_1_score: number;
  solution_2_score: number;
};

type AIBATTLESTATE = {
  messages: typeof MessagesValue;
  solution_1: string;
  solution_2: string;
  judge: JUDGEMENT;
};
/**responsibility of the sate to transfer the data from one node to another node  */
const state: AIBATTLESTATE = {
  messages: MessagesValue,
  solution_1: "",
  solution_2: "",
  judge: {
    winner: "solution_1",
    solution_1_score: 0,
    solution_2_score: 0,
  },
};

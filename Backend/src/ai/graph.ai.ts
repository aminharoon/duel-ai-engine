import {
  StateGraph,
  type GraphNode,
  StateSchema,
  START,
  END,
} from "@langchain/langgraph";
import z from "zod";
import { cohereModel, googleModel, mistralModel } from "./ai.models.js";
import { createAgent, HumanMessage, providerStrategy } from "langchain";

/**Define the states how the nodes look like  */

const state = new StateSchema({
  problem: z.string(),
  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judge: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_feedBack: z.string().default(""),
    solution_2_feedBack: z.string().default(""),
    recommendation: z.string().default(""),
  }),
});

/**creating the solution node which generate solution for the giving problem and update the solution into the state */
/**“In LangGraph, we don’t mutate state directly. Each node returns updates, and LangGraph merges them into the state.” */

const solutionNode: GraphNode<typeof state> = async (state) => {
  const [mistralResponse, CohereResponse] = await Promise.all([
    mistralModel.invoke(state.problem),
    cohereModel.invoke(state.problem),
  ]);
  return {
    solution_1: mistralResponse.text,
    solution_2: CohereResponse.text,
  };
};

/** creating the judge node which has the access of the state like problem ,solution's and judge object */

/**by creating an agent we can get an structured response  */
const judgeNode: GraphNode<typeof state> = async (state) => {
  const { problem, solution_1, solution_2 } = state;
  const judge = createAgent({
    model: googleModel,
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
        solution_1_feedBack: z.string().default(""),
        solution_2_feedBack: z.string().default(""),
        recommendation: z.string().default(""),
      }),
    ),
    systemPrompt: `You are a judge for a coding competition. You will be given a problem statement and two solutions. You need to evaluate the solutions based on their correctness, efficiency, and clarity. You will provide a score out of 10 for each solution and feedback explaining the scores.`,
  });

  const judgeResponse = await judge.invoke({
    messages: [
      new HumanMessage(`ai problem: ${problem}
                        solution 1: ${solution_1}
                         solution 2: ${solution_2}
                        Please evaluate the solutions and provide scores and feedback.
                    `),
    ],
  });

  const {
    solution_1_score,
    solution_2_score,
    solution_1_feedBack,
    solution_2_feedBack,
    recommendation,
  } = judgeResponse.structuredResponse;

  return {
    judge: {
      solution_1_score,
      solution_2_score,
      solution_1_feedBack,
      solution_2_feedBack,
      recommendation,
    },
  };
};

/**
 * creating the graph by adding the nodes and edges between them and compile it to make it ready for execution
 */
const graph = new StateGraph(state)
  .addNode("solution", solutionNode)
  .addNode("judge_node", judgeNode)
  .addEdge(START, "solution")
  .addEdge("solution", "judge_node")
  .addEdge("judge_node", END)
  .compile();

export const useGraph = async (problem: string) => {
  const result = graph.invoke({
    problem: problem,
  });
  return result;
};

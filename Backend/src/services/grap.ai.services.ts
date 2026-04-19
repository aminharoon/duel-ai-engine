import { HumanMessage } from "@langchain/core/messages";
import {
  StateSchema,
  MessagesValue,
  StateGraph,
  ReducedValue,
  START,
  END,
} from "@langchain/langgraph";
import type { GraphNode } from "@langchain/langgraph";
import { z } from "zod";
import { geminiModel, mistralModel, cohereModel } from "./model.services.js";
import { createAgent, providerStrategy } from "langchain";

const State = new StateSchema({
  messages: MessagesValue,

  solution_1: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => {
      return next;
    },
  }),

  solution_2: new ReducedValue(z.string().default(""), {
    reducer: (current, next) => {
      return next;
    },
  }),

  judge_recommendation: new ReducedValue(
    z.object().default({
      solution_1_score: 0,
      solution_2_score: 0,
    }),
    {
      reducer: (current, next) => {
        return next;
      },
    },
  ),
});

const solutionNode: GraphNode<typeof State> = async (state: typeof State) => {
  const [solution_1_mistral, solution_2_cohere] = await Promise.all([
    mistralModel.invoke(state.messages[0].text),
    cohereModel.invoke(state.messages[0].text),
  ]);

  return {
    solution_1: solution_1_mistral.text,
    solution_2: solution_2_cohere.text,
  };
};

const judgeNode: GraphNode<typeof State> = async (state: typeof State) => {
  const { solution_1, solution_2 } = State;

  const judge = createAgent({
    model: geminiModel,
    tools: [],
    responseFormat: providerStrategy(
      z.object({
        solution_1_score: z.number().min(0).max(10),
        solution_2_score: z.number().min(0).max(10),
      }),
    ),
  });
  const judge_response = await judge.invoke({
    messages: [
      new HumanMessage(
        `you are a judge and you have to evaluate two solutions for the following question: ${state.messages[0].text} and give a score between 0 and 10 for each solution based on their quality. Here are the two solutions: Solution 1: ${solution_1} Solution 2: ${solution_2} Remember to only give a score and not to give any explanation for the scores. `,
      ),
    ],
  });
  const result = await judge_response.structuredResponse;
  return {
    judge_recommendation: result,
  };
};

const graph = new StateGraph(State)
  .addNode("solution", solutionNode)
  .addNode("judge", judgeNode)
  .addEdge(START, "solution")
  .addNode("solution", "judge")
  .addEdge("judge", END)
  .compile();

export const getResponse = async (userMessage: string) => {
  try {
    const result = await graph.invoke({
      messages: [new HumanMessage(userMessage)],
    });

    console.log(result);
  } catch (e) {
    console.log(
      "something went wrong while calling the graph node ",
      e.message,
    );
  }
};

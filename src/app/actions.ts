"use server";

import { simulateAITask, SimulateAITaskInput } from "@/ai/flows/simulate-ai-tasks";

export async function getAIResult(
  input: SimulateAITaskInput
): Promise<{ result: string } | { error: string }> {
  try {
    const result = await simulateAITask(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: "Failed to get AI result." };
  }
}

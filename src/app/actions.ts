"use server";

import { simulateAITask, SimulateAITaskInput } from "@/ai/flows/simulate-ai-tasks";
import { analyzeWorkflowPerformance, WorkflowAnalysisInput, WorkflowAnalysisOutput } from "@/ai/flows/cognitive-orchestration-flow";
import { generateAgentManifest, GenerateAgentManifestInput, GenerateAgentManifestOutput } from "@/ai/flows/generate-agent-manifest-flow";

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


export async function getWorkflowAnalysis(input: WorkflowAnalysisInput): Promise<WorkflowAnalysisOutput | { error: string }> {
    try {
      // In a real app, you'd fetch real workflow history. Here, we pass the mock data.
      const result = await analyzeWorkflowPerformance(input);
      return result;
    } catch (e) {
      console.error(e);
      return { error: "Failed to get workflow analysis." };
    }
}

export async function getAgentManifest(input: GenerateAgentManifestInput): Promise<GenerateAgentManifestOutput | { error: string }> {
  try {
    const result = await generateAgentManifest(input);
    return result;
  } catch (e) {
    console.error(e);
    return { error: "Failed to get agent manifest." };
  }
}

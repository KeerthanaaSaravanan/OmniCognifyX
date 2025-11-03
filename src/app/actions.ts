"use server";

import { simulateAITask, SimulateAITaskInput } from "@/ai/flows/simulate-ai-tasks";
import { analyzeWorkflowPerformance } from "@/ai/flows/cognitive-orchestration-flow";
import { generateAgentManifest, GenerateAgentManifestInput, GenerateAgentManifestOutput } from "@/ai/flows/generate-agent-manifest-flow";
import type { WorkflowAnalysisInput, WorkflowAnalysisOutput } from "@/ai/schemas/cognitive-orchestration-schemas";

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

export async function triggerDemo(): Promise<{ success: boolean } | { error: string }> {
  try {
    // This is a simulation. In a real app, this would trigger a backend process.
    console.log("Demo triggered!");
    // You could fetch from a dummy endpoint here if you had one:
    // await fetch('http://localhost:3001/api/demo/trigger', { method: 'POST' });
    return { success: true };
  } catch (e) {
    console.error("Failed to trigger demo:", e);
    return { error: "Failed to trigger demo sequence." };
  }
}

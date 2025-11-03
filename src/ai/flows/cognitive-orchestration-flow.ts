'use server';

/**
 * @fileOverview A cognitive orchestration loop AI agent for analyzing and optimizing workflows.
 *
 * - analyzeWorkflowPerformance - A function that analyzes workflow performance and suggests optimizations.
 * - WorkflowAnalysisInput - The input type for the analyzeWorkflowPerformance function.
 * - WorkflowAnalysisOutput - The return type for the analyzeWorkflowPerformance function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const WorkflowAnalysisInputSchema = z.object({
  workflowHistory: z.string().describe('A JSON string representing the history of recent workflow runs, including durations and outcomes.'),
});
export type WorkflowAnalysisInput = z.infer<typeof WorkflowAnalysisInputSchema>;

const OptimizationSuggestionSchema = z.object({
    suggestion: z.string().describe("A specific, actionable suggestion to optimize the workflow. e.g., 'Cache intermediate results in Customer Feedback Analysis' or 'Reorder data processing for 17% faster performance'"),
    reasoning: z.string().describe("A brief explanation for why this suggestion would be effective."),
    expectedImpact: z.string().describe("The anticipated impact, like '15-20% reduction in latency' or 'Reduced API call failures'.")
});

export const WorkflowAnalysisOutputSchema = z.object({
  overallAnalysis: z.string().describe('A high-level summary of the workflow performance, including any identified bottlenecks or patterns.'),
  optimizations: z.array(OptimizationSuggestionSchema).describe('A list of concrete optimization suggestions.'),
});
export type WorkflowAnalysisOutput = z.infer<typeof WorkflowAnalysisOutputSchema>;


export async function analyzeWorkflowPerformance(
  input: WorkflowAnalysisInput
): Promise<WorkflowAnalysisOutput> {
  return cognitiveOrchestrationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'cognitiveOrchestrationPrompt',
  input: {schema: WorkflowAnalysisInputSchema},
  output: {schema: WorkflowAnalysisOutputSchema},
  prompt: `You are a sophisticated AI Workflow Optimization agent. Your task is to analyze workflow performance data and provide a concise analysis and actionable optimization suggestions.

Analyze the following workflow history:
{{{workflowHistory}}}

Based on your analysis, provide:
1.  An 'overallAnalysis' of performance, identifying patterns, bottlenecks, or inefficiencies.
2.  A list of 'optimizations', which are concrete suggestions to improve performance, reduce cost, or increase reliability. For each suggestion, provide a brief 'reasoning' and the 'expectedImpact'.

Examples of good suggestions:
- "Reorder data processing for 17% faster performance"
- "Cache intermediate results in 'Customer Feedback Analysis' workflow"
- "Reduce API call frequency in 'Social Media Monitoring'"
- "Parallelize data ingestion steps for 'Q2 Sales Report'"

Focus on high-impact, actionable advice.`,
});

const cognitiveOrchestrationFlow = ai.defineFlow(
  {
    name: 'cognitiveOrchestrationFlow',
    inputSchema: WorkflowAnalysisInputSchema,
    outputSchema: WorkflowAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

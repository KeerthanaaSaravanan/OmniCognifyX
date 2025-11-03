'use server';

/**
 * @fileOverview A cognitive orchestration loop AI agent for analyzing and optimizing workflows.
 *
 * - analyzeWorkflowPerformance - A function that analyzes workflow performance and suggests optimizations.
 */

import {ai} from '@/ai/genkit';
import {
    WorkflowAnalysisInput,
    WorkflowAnalysisInputSchema,
    WorkflowAnalysisOutput,
    WorkflowAnalysisOutputSchema
} from '@/ai/schemas/cognitive-orchestration-schemas';


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

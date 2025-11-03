/**
 * @fileOverview Schemas and types for the cognitive orchestration flow.
 */
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

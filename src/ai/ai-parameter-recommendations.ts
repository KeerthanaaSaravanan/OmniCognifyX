'use server';

/**
 * @fileOverview An AI-powered parameter recommendation flow.
 *
 * - getAIParameterRecommendations - A function that suggests optimal configurations and parameters for AI tasks.
 * - AIParameterRecommendationsInput - The input type for the getAIParameterRecommendations function.
 * - AIParameterRecommendationsOutput - The return type for the getAIParameterRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIParameterRecommendationsInputSchema = z.object({
  taskDescription: z
    .string()
    .describe('A description of the AI task for which parameters are needed.'),
  performanceGoals: z
    .string()
    .describe('The performance goals for the AI task (e.g., accuracy, speed).'),
  costConstraints: z
    .string()
    .describe('The cost constraints for the AI task (e.g., budget limits).'),
});
export type AIParameterRecommendationsInput = z.infer<
  typeof AIParameterRecommendationsInputSchema
>;

const AIParameterRecommendationsOutputSchema = z.object({
  recommendedParameters: z
    .string()
    .describe(
      'A list of recommended configurations and parameters for the AI task, considering performance and cost-efficiency.'
    ),
  explanation: z
    .string()
    .describe(
      'An explanation of why the recommended parameters are optimal, considering performance and cost-efficiency factors.'
    ),
});
export type AIParameterRecommendationsOutput = z.infer<
  typeof AIParameterRecommendationsOutputSchema
>;

export async function getAIParameterRecommendations(
  input: AIParameterRecommendationsInput
): Promise<AIParameterRecommendationsOutput> {
  return aiParameterRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiParameterRecommendationsPrompt',
  input: {schema: AIParameterRecommendationsInputSchema},
  output: {schema: AIParameterRecommendationsOutputSchema},
  prompt: `You are an AI parameter optimization expert. Based on the task description, performance goals, and cost constraints, you will suggest the optimal configurations and parameters for the AI task.

Task Description: {{{taskDescription}}}
Performance Goals: {{{performanceGoals}}}
Cost Constraints: {{{costConstraints}}}

Provide a list of recommended parameters and an explanation of why they are optimal, considering both performance and cost-efficiency.`,
});

const aiParameterRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiParameterRecommendationsFlow',
    inputSchema: AIParameterRecommendationsInputSchema,
    outputSchema: AIParameterRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

'use server';

/**
 * @fileOverview Simulates AI-driven tasks within workflows.
 *
 * - simulateAITask - A function that simulates an AI task based on the provided task type and input data.
 * - SimulateAITaskInput - The input type for the simulateAITask function.
 * - SimulateAITaskOutput - The return type for the simulateAITask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SimulateAITaskInputSchema = z.object({
  taskType: z
    .string()
    .describe(
      'The type of AI task to simulate (e.g., data analysis, sentiment analysis, content generation).'
    ),
  inputData: z
    .string()
    .describe('The input data for the AI task, provided as a string.'),
});
export type SimulateAITaskInput = z.infer<typeof SimulateAITaskInputSchema>;

const SimulateAITaskOutputSchema = z.object({
  result: z
    .string()
    .describe('The simulated result of the AI task, based on the input data.'),
});
export type SimulateAITaskOutput = z.infer<typeof SimulateAITaskOutputSchema>;

export async function simulateAITask(
  input: SimulateAITaskInput
): Promise<SimulateAITaskOutput> {
  return simulateAITaskFlow(input);
}

const simulateAITaskPrompt = ai.definePrompt({
  name: 'simulateAITaskPrompt',
  input: {schema: SimulateAITaskInputSchema},
  output: {schema: SimulateAITaskOutputSchema},
  prompt: `You are simulating an AI-driven task. Based on the task type and input data provided, generate a simulated result.

Task Type: {{{taskType}}}
Input Data: {{{inputData}}}

Simulated Result:`,
});

const simulateAITaskFlow = ai.defineFlow(
  {
    name: 'simulateAITaskFlow',
    inputSchema: SimulateAITaskInputSchema,
    outputSchema: SimulateAITaskOutputSchema,
  },
  async input => {
    const {output} = await simulateAITaskPrompt(input);
    return output!;
  }
);

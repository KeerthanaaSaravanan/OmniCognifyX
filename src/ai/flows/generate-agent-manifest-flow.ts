'use server';

/**
 * @fileOverview A flow for generating a composable agent manifest.
 *
 * - generateAgentManifest - A function that generates an agent manifest YAML.
 * - GenerateAgentManifestInput - The input type for the generateAgentManifest function.
 * - GenerateAgentManifestOutput - The return type for the generateAgentManifest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const GenerateAgentManifestInputSchema = z.object({
  pattern: z.string().describe('The name of the agent pattern (e.g., "follow-up-email-crm").'),
  tools: z.array(z.string()).describe('A list of tools the agent can use.'),
});
export type GenerateAgentManifestInput = z.infer<typeof GenerateAgentManifestInputSchema>;

export const GenerateAgentManifestOutputSchema = z.object({
  agentManifestYAML: z.string().describe('A YAML string representing the agent manifest.'),
  testPayload: z.record(z.any()).describe('A sample test payload for the agent.'),
  governance: z.literal('PASS').describe('The result of the governance pre-check.'),
});
export type GenerateAgentManifestOutput = z.infer<typeof GenerateAgentManifestOutputSchema>;

export async function generateAgentManifest(
  input: GenerateAgentManifestInput
): Promise<GenerateAgentManifestOutput> {
  return generateAgentManifestFlow(input);
}

const generateAgentManifestFlow = ai.defineFlow(
  {
    name: 'generateAgentManifestFlow',
    inputSchema: GenerateAgentManifestInputSchema,
    outputSchema: GenerateAgentManifestOutputSchema,
  },
  async ({pattern}) => {
    // Simulate a call to a GovernanceAgent for a pre-check.
    // In a real scenario, this would involve more complex validation.
    const governanceCheck = {
      status: 'PASS',
      timestamp: new Date().toISOString(),
    };

    if (governanceCheck.status !== 'PASS') {
      throw new Error('Governance pre-check failed.');
    }

    const agentManifestYAML = `
apiVersion: watsonx.ibm.com/v1
kind: Agent
metadata:
  name: ${pattern}
spec:
  description: "An agent to handle ${pattern.replace(/-/g, ' ')}."
  steps:
    - name: ingest
      description: "Ingest initial data."
      source: "watsonx.data"
    - name: analyze
      description: "Analyze data and generate insights."
      source: "watsonx.ai"
    - name: approve
      description: "Approval step with governance checks."
      source: "watsonx.governance"
    `;

    const testPayload = {
      pattern,
      sampleInput: {
        customerId: "cust-12345",
        lastInteraction: "2024-07-30T10:00:00Z",
        topic: "Initial inquiry about pricing"
      }
    };

    return {
      agentManifestYAML: agentManifestYAML.trim(),
      testPayload,
      governance: 'PASS',
    };
  }
);

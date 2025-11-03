/**
 * @fileOverview Schemas and types for the generate agent manifest flow.
 */
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


"use client";

import { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { generateAgent } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2, FileText, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const availableTools = [
    "Market Intelligence",
    "Keyword Research",
    "Content Strategy",
    "SEO Content Writing",
    "Technical SEO Audit",
    "Rank Tracking",
];

export default function CreateAgentPage() {
    const [pattern, setPattern] = useState("");
    const [selectedTools, setSelectedTools] = useState<string[]>([]);
    const [isGenerating, startGenerationTransition] = useTransition();
    const [generatedManifest, setGeneratedManifest] = useState<any>(null);
    const { toast } = useToast();

    const handleToolToggle = (tool: string) => {
        setSelectedTools(prev => 
            prev.includes(tool) ? prev.filter(t => t !== tool) : [...prev, tool]
        );
    };

    const handleGenerate = () => {
        if (!pattern || selectedTools.length === 0) {
            toast({
                variant: "destructive",
                title: "Incomplete Agent Definition",
                description: "Please provide a name pattern and select at least one tool.",
            });
            return;
        }

        startGenerationTransition(async () => {
            setGeneratedManifest(null);
            const response = await generateAgent({ pattern, tools: selectedTools });
            if ('error' in response) {
                toast({
                    variant: "destructive",
                    title: "Generation Failed",
                    description: response.error,
                });
            } else {
                setGeneratedManifest(response.manifest);
                toast({
                    title: "Agent Manifest Generated!",
                    description: `The manifest for "${pattern}" has been successfully created.`,
                });
            }
        });
    };

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Create Autonomous Agent</h1>
                <p className="text-muted-foreground">
                    Define the capabilities of your new SEO and marketing agent.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle>Agent Definition</CardTitle>
                        <CardDescription>Configure the agent's name and tools.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="pattern">Agent Name Pattern</Label>
                            <Input 
                                id="pattern" 
                                placeholder="e.g., 'seo-content-writer'" 
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Agent Tools</Label>
                            <div className="space-y-3 rounded-lg border p-4">
                                {availableTools.map(tool => (
                                    <div key={tool} className="flex items-center space-x-3">
                                        <Checkbox 
                                            id={tool} 
                                            checked={selectedTools.includes(tool)}
                                            onCheckedChange={() => handleToolToggle(tool)}
                                        />
                                        <Label htmlFor={tool} className="font-normal cursor-pointer">{tool}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                            {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                            Generate Agent Manifest
                        </Button>
                    </CardContent>
                </Card>

                <AnimatePresence>
                {isGenerating || generatedManifest ? (
                     <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                     >
                        <Card>
                            <CardHeader>
                                <CardTitle>Generated Manifest</CardTitle>
                                <CardDescription>Review the generated agent configuration.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {isGenerating ? (
                                    <div className="flex items-center justify-center h-48">
                                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 text-green-500">
                                            <CheckCircle className="h-5 w-5" />
                                            <p className="font-semibold">Governance Pre-check: PASS</p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Manifest YAML</Label>
                                            <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto">
                                                <code>
                                                    {generatedManifest.agentManifestYAML}
                                                </code>
                                            </pre>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Test Payload</Label>
                                             <pre className="p-4 rounded-lg bg-secondary text-sm overflow-x-auto">
                                                <code>
                                                    {JSON.stringify(generatedManifest.testPayload, null, 2)}
                                                </code>
                                            </pre>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                ) : (
                    <div className="flex items-center justify-center h-full rounded-lg border-2 border-dashed">
                        <div className="text-center text-muted-foreground p-8">
                            <FileText className="mx-auto h-12 w-12" />
                            <p className="mt-4 font-semibold">Your generated manifest will appear here.</p>
                        </div>
                    </div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
}

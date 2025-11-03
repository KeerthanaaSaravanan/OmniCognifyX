
"use client";

import { useState, useEffect, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Lightbulb, Zap, Cpu, BarChart2, Check, RefreshCw, Loader2, Wand2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { getWorkflowAnalysis } from "@/app/actions";
import { workflows } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import type { WorkflowAnalysisOutput } from "@/ai/schemas/cognitive-orchestration-schemas";

const initialInsights = [
  "Agent synergy improving...",
  "High resource usage detected on 'Q2 Sales Report Generation'",
  "New optimization pattern found for data ingestion",
];

export default function CognitiveOrchestrationLoopPage() {
  const [efficiency, setEfficiency] = useState(78);
  const [optimizationsApplied, setOptimizationsApplied] = useState(12);
  const [insights, setInsights] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<WorkflowAnalysisOutput | null>(null);
  const [isAnalyzing, startAnalysisTransition] = useTransition();
  const { toast } = useToast();

  const handleRunAnalysis = () => {
    startAnalysisTransition(async () => {
      setAnalysis(null);
      const workflowHistory = JSON.stringify(workflows.slice(0, 5), null, 2);
      const response = await getWorkflowAnalysis({ workflowHistory });

      if ('error' in response) {
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: response.error,
        });
      } else {
        setAnalysis(response);
        toast({
          title: "Analysis Complete",
          description: "Workflow performance analysis has been updated.",
        });
      }
    });
  };

  const handleApplyOptimization = (suggestion: string) => {
    toast({
        title: "Applying Optimization (Simulated)",
        description: `Applying: "${suggestion}"`,
    });
    // Simulate improvement
    setTimeout(() => {
        setEfficiency(prev => Math.min(prev + (Math.random() * 5 + 2), 98));
        setOptimizationsApplied(prev => prev + 1);
        toast({
            title: "Optimization Applied!",
            description: `Efficiency has improved.`,
            className: "bg-green-100 dark:bg-green-900",
        });
    }, 1500);
  }

  useEffect(() => {
    handleRunAnalysis(); // Run analysis on initial load
  }, []);


  useEffect(() => {
    const insightTimer = setInterval(() => {
        setInsights(prev => {
            const newInsight = initialInsights[Math.floor(Math.random() * initialInsights.length)];
            const newInsights = [newInsight, ...prev];
            if (newInsights.length > 3) {
                newInsights.pop();
            }
            return newInsights;
        });
    }, 5000);


    return () => {
        clearInterval(insightTimer)
    };
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Cognitive Orchestration Loop</h1>
            <p className="text-muted-foreground">
            Real-time monitoring, analysis, and optimization of your AI agent workflows.
            </p>
        </div>
        <Button onClick={handleRunAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <RefreshCw className="mr-2 h-4 w-4" />}
            Re-Analyze Workflows
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Workflow Efficiency</CardTitle>
            <BarChart2 className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{efficiency.toFixed(1)}%</div>
            <Progress value={efficiency} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Cpu className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 / 4</div>
            <p className="text-xs text-muted-foreground">All agents operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimizations Applied</CardTitle>
            <Zap className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{optimizationsApplied}</div>
            <p className="text-xs text-muted-foreground">Automatically applied in last 24h</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb /> Optimization Suggestions</CardTitle>
            {isAnalyzing ? (
                 <CardDescription>Analyzing workflow performance...</CardDescription>
            ) : analysis ? (
                 <CardDescription>{analysis.overallAnalysis}</CardDescription>
            ) : (
                <CardDescription>Run analysis to generate optimization suggestions.</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {isAnalyzing && (
                <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            )}
            {analysis?.optimizations.map((opt, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Wand2 className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                <div className="flex-1">
                    <p className="font-semibold text-sm">{opt.suggestion}</p>
                    <p className="text-xs text-muted-foreground mt-1">{opt.reasoning} - <span className="font-medium text-green-600 dark:text-green-400">Impact: {opt.expectedImpact}</span></p>
                </div>
                <Button size="sm" variant="outline" onClick={() => handleApplyOptimization(opt.suggestion)}>
                    <Check className="mr-2 h-4 w-4" /> Apply
                </Button>
              </div>
            ))}
             {!isAnalyzing && analysis?.optimizations.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No new optimizations found. Workflows are running efficiently.</p>
             )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity /> Live Insight Stream</CardTitle>
            <CardDescription>Real-time analysis from the orchestration layer.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
              {insights.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Awaiting insights...</p>}
            {insights.map((insight, index) => (
                <div key={index} className="relative animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 dark:bg-blue-950 dark:border-blue-800 animate-pulse-once">
                        <p className="text-sm text-blue-700 dark:text-blue-300">{insight}</p>
                    </div>
                </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Activity, Lightbulb, Zap, Cpu, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const initialSuggestions = [
  "Reorder data processing for 17% faster performance",
  "Cache intermediate results in 'Customer Feedback Analysis' workflow",
  "Reduce API call frequency in 'Social Media Monitoring'",
];

const initialInsights = [
  "Agent synergy improving...",
  "High resource usage detected on 'Q2 Sales Report Generation'",
  "New optimization pattern found for data ingestion",
];

export default function CognitiveOrchestrationLoopPage() {
  const [efficiency, setEfficiency] = useState(0);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [insights, setInsights] = useState<string[]>([]);

  useEffect(() => {
    const efficiencyTimer = setInterval(() => {
      setEfficiency((prev) => (prev >= 100 ? 0 : prev + Math.random() * 5));
    }, 1500);

    const insightTimer = setInterval(() => {
        setInsights(prev => {
            const newInsight = initialInsights[Math.floor(Math.random() * initialInsights.length)];
            const newInsights = [newInsight, ...prev];
            if (newInsights.length > 3) {
                newInsights.pop();
            }
            return newInsights;
        });
    }, 3000);


    return () => {
        clearInterval(efficiencyTimer)
        clearInterval(insightTimer)
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Cognitive Orchestration Loop</h1>
        <p className="text-muted-foreground">
          Real-time monitoring, analysis, and optimization of your AI agent workflows.
        </p>
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
            <p className="text-xs text-muted-foreground">+20.1% from last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimizations Applied</CardTitle>
            <Zap className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12</div>
            <p className="text-xs text-muted-foreground">Automatically applied in last 24h</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb /> Optimization Suggestions</CardTitle>
            <CardDescription>AI-powered recommendations to improve workflow performance.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {suggestions.map((suggestion, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
                <Zap className="h-5 w-5 text-yellow-500 mt-1" />
                <p className="text-sm">{suggestion}</p>
              </div>
            ))}
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

// Add animation keyframes to globals.css if they don't exist
const keyframes = `
@keyframes pulse-once {
  0%, 100% { background-color: transparent; }
  50% { background-color: hsl(var(--accent) / 0.1); }
}
.animate-pulse-once {
  animation: pulse-once 1.5s ease-out;
}
`;
// Note: You might need to add the above CSS to your globals.css file.
// I will attempt to add it, but it might require manual intervention.
// For now, adding style tag to component.
const GlobalStyle = () => <style>{keyframes}</style>

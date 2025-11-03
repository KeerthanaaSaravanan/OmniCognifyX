
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import OrchestrationVisualizer from '@/components/orchestration/orchestration-visualizer';
import FlowConsole from '@/components/orchestration/flow-console';

const initialSteps = [
  { id: 'datasense', label: 'DataSense Agent', status: 'idle', duration: 2000 },
  { id: 'taskflow', label: 'TaskFlow Agent', status: 'idle', duration: 1500 },
  { id: 'insightsynth', label: 'InsightSynth Agent', status: 'idle', duration: 2500 },
  { id: 'governguard', label: 'GovernGuard Agent', status: 'idle', duration: 1000 },
];

export default function OrchestrationPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState<number | null>(null);

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setRunId(Date.now()); // Create a new unique ID for this run
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Orchestration Visualizer</h1>
          <p className="text-muted-foreground">
            Watch your AI agents collaborate in real-time.
          </p>
        </div>
        <Button onClick={handleRunWorkflow} disabled={isRunning}>
          <Play className="mr-2 h-4 w-4" />
          Run Full Workflow
        </Button>
      </div>

      <OrchestrationVisualizer
        initialSteps={initialSteps}
        isRunning={isRunning}
        onCompletion={() => setIsRunning(false)}
      />
      
      <FlowConsole isRunning={isRunning} runId={runId} />
    </div>
  );
}

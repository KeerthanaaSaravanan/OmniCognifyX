
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';
import OrchestrationVisualizer from '@/components/orchestration/orchestration-visualizer';
import FlowConsole from '@/components/orchestration/flow-console';
import { useDemoMode } from '@/context/demo-mode-context';

const initialSteps = [
  { id: 'datasense', label: 'DataSense Agent', status: 'idle', duration: 2000 },
  { id: 'taskflow', label: 'TaskFlow Agent', status: 'idle', duration: 1500 },
  { id: 'insightsynth', label: 'InsightSynth Agent', status: 'idle', duration: 2500 },
  { id: 'governguard', label: 'GovernGuard Agent', status: 'idle', duration: 1000 },
];

export default function OrchestrationPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [runId, setRunId] = useState<number | null>(null);
  const { isDemoMode } = useDemoMode();

  const handleRunWorkflow = () => {
    setIsRunning(true);
    setRunId(Date.now()); // Create a new unique ID for this run
  };

  // Trigger workflow when demo mode is activated and we are on this page
  useEffect(() => {
    if (isDemoMode && !isRunning) {
      handleRunWorkflow();
    }
    // If we leave demo mode, stop the run
    if (!isDemoMode && isRunning) {
        setIsRunning(false);
    }
  }, [isDemoMode]);

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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <OrchestrationVisualizer
            initialSteps={initialSteps}
            isRunning={isRunning}
            onCompletion={() => setIsRunning(false)}
          />
        </div>
        <div className="lg:col-span-2">
            <FlowConsole isRunning={isRunning} runId={runId} />
        </div>
      </div>
    </div>
  );
}

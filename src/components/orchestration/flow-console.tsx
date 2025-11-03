
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Bot, ShieldCheck, Database, Terminal } from 'lucide-react';

const logMessages: { [key: string]: { text: string; icon: JSX.Element } } = {
  'datasense-start': { text: 'Data pull initiated from watsonx.data...', icon: <Database className="h-4 w-4 text-blue-500" /> },
  'datasense-done': { text: 'Data pulled from watsonx.data', icon: <Check className="h-4 w-4 text-green-500" /> },
  'insightsynth-start': { text: 'Processing through watsonx.ai...', icon: <Bot className="h-4 w-4 text-purple-500" /> },
  'insightsynth-done': { text: 'Processed through watsonx.ai', icon: <Check className="h-4 w-4 text-green-500" /> },
  'governguard-start': { text: 'Validation via watsonx.governance...', icon: <ShieldCheck className="h-4 w-4 text-red-500" /> },
  'governguard-done': { text: 'Validated via watsonx.governance', icon: <Check className="h-4 w-4 text-green-500" /> },
  'orchestrate-done': { text: 'Automated by watsonx Orchestrate', icon: <Check className="h-4 w-4 text-green-500" /> },
};

const sseFlow: (keyof typeof logMessages)[] = [
    'datasense-start',
    'datasense-done',
    'insightsynth-start',
    'insightsynth-done',
    'governguard-start',
    'governguard-done',
    'orchestrate-done'
];

interface FlowConsoleProps {
  isRunning: boolean;
  runId: number | null;
}

export default function FlowConsole({ isRunning, runId }: FlowConsoleProps) {
  const [logs, setLogs] = useState<{ text: string; icon: JSX.Element }[]>([]);
  const consoleRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!isRunning || runId === null) {
        setLogs([]);
        return;
    }

    let eventSource: EventSource | null = null;
    let sseIndex = 0;
    
    const streamLogs = () => {
        if(sseIndex >= sseFlow.length) {
            return;
        }

        const logKey = sseFlow[sseIndex];
        const newLog = logMessages[logKey];
        
        setLogs(prev => [...prev, newLog]);
        
        sseIndex++;
        
        // Simulate network delay for SSE
        setTimeout(streamLogs, 750 + Math.random() * 500);
    }

    // Start the fake SSE stream
    streamLogs();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
      sseIndex = sseFlow.length; // Stop timeouts
    };
  }, [isRunning, runId]);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Terminal />
          IBM watsonx Orchestrate Flow Console
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={consoleRef} className="h-64 bg-gray-900 dark:bg-black p-4 rounded-lg overflow-y-auto font-mono text-sm text-white">
          {logs.length === 0 && (
            <p className="text-gray-400">Awaiting workflow execution...</p>
          )}
          {logs.map((log, index) => (
            <div key={index} className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <span className="text-gray-500">{new Date().toLocaleTimeString()}</span>
              {log.icon}
              <span>{log.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

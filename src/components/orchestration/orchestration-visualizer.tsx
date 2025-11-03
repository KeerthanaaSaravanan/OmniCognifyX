
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Loader, XCircle, Bot, Zap, ShieldCheck, Database } from 'lucide-react';

const agentIcons: { [key: string]: JSX.Element } = {
  datasense: <Database className="h-8 w-8" />,
  taskflow: <Zap className="h-8 w-8" />,
  insightsynth: <Bot className="h-8 w-8" />,
  governguard: <ShieldCheck className="h-8 w-8" />,
};

type StepStatus = 'idle' | 'running' | 'completed' | 'failed';
type Step = { id: string; label: string; status: StepStatus; duration: number };

interface OrchestrationVisualizerProps {
  initialSteps: Omit<Step, 'status'>[];
  isRunning: boolean;
  onCompletion: () => void;
}

export default function OrchestrationVisualizer({
  initialSteps,
  isRunning,
  onCompletion,
}: OrchestrationVisualizerProps) {
  const [steps, setSteps] = useState<Step[]>(initialSteps.map(s => ({ ...s, status: 'idle' })));

  useEffect(() => {
    if (!isRunning) {
      setSteps(initialSteps.map(s => ({ ...s, status: 'idle' })));
      return;
    }

    let currentStepIndex = 0;
    let isMounted = true;

    const runStep = () => {
      if (currentStepIndex >= steps.length || !isMounted) {
        if(isMounted) onCompletion();
        return;
      }

      setSteps(prev =>
        prev.map((step, i) =>
          i === currentStepIndex ? { ...step, status: 'running' } : step
        )
      );

      setTimeout(() => {
        if (!isMounted) return;
        setSteps(prev =>
          prev.map((step, i) =>
            i === currentStepIndex ? { ...step, status: 'completed' } : step
          )
        );
        currentStepIndex++;
        runStep();
      }, steps[currentStepIndex].duration);
    };

    runStep();

    return () => {
      isMounted = false;
    };
  }, [isRunning]);

  return (
    <div className="relative w-full p-8 rounded-lg bg-card border shadow-sm overflow-hidden">
      <AnimatePresence>
        {isRunning && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-sm"
          >
            IBM watsonx Orchestrate: Executing Workflow…
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex justify-between items-center relative mt-10">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center z-10">
            <motion.div
              animate={{
                scale: step.status === 'running' ? 1.1 : 1,
                borderColor:
                  step.status === 'completed' ? 'hsl(var(--primary))' : 
                  step.status === 'running' ? 'hsl(var(--accent))' : 
                  'hsl(var(--border))',
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative flex items-center justify-center h-20 w-20 rounded-full border-2 bg-background"
            >
              {step.status === 'running' && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-primary/20"
                  animate={{ scale: [1, 1.2, 1], opacity: [0, 0.5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                />
              )}
              {step.status === 'completed' && (
                <CheckCircle className="h-8 w-8 text-primary" />
              )}
              {step.status === 'running' && (
                <Loader className="h-8 w-8 text-accent animate-spin" />
              )}
              {step.status === 'idle' && (
                <div className="text-muted-foreground">{agentIcons[step.id]}</div>
              )}
               {step.status === 'failed' && (
                <XCircle className="h-8 w-8 text-destructive" />
              )}
            </motion.div>
            <p className="mt-2 text-sm font-medium">{step.label}</p>
          </div>
        ))}
      </div>
      <div className="absolute top-1/2 left-0 right-0 h-1 bg-border/50 transform -translate-y-1/2 mt-5">
        <motion.div
          className="h-1 bg-primary"
          initial={{ width: 0 }}
          animate={{
            width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </div>
       <div className="absolute bottom-4 right-4 text-xs text-muted-foreground opacity-50">
        Powered by IBM watsonx Orchestrate
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { availableTasks } from "@/lib/data";
import type { AvailableTask } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, GripVertical, Trash2, X, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type WorkflowStep = AvailableTask & { instanceId: number; y: number };

const Node = ({ step, onRemove }: { step: WorkflowStep; onRemove: (id: number) => void; }) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-neutral-800/80 border border-neutral-700 rounded-lg p-4 w-80 shadow-lg flex items-start gap-4"
            style={{ y: step.y }}
        >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-neutral-500" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-neutral-500" />
            </div>

            <step.icon className="h-6 w-6 text-primary mt-1" />
            <div className="flex-1">
                <div className="flex justify-between items-center">
                    <p className="font-bold">{step.name}</p>
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive" onClick={() => onRemove(step.instanceId)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                <p className="text-sm text-neutral-400 mt-1">{step.description}</p>
                <p className="text-xs text-neutral-500 mt-2">ID: {`inst_${step.instanceId}`}</p>
            </div>
        </motion.div>
    );
};


const ConnectionLine = ({ fromY, toY }: { fromY: number, toY: number }) => {
  const y1 = fromY + 80; // Bottom of the node approx
  const y2 = toY - 12; // Top of the node approx
  const midY = (y1 + y2) / 2;

  // Straight line from bottom of one node to top of next
  const pathData = `M 160 ${y1} L 160 ${y2}`;

  return (
    <svg className="absolute top-0 left-0 w-80 h-full pointer-events-none" style={{height: "100%"}}>
      <path d={pathData} stroke="hsl(var(--border))" strokeWidth="1.5" fill="none" />
    </svg>
  );
};


const ConfigurationSidebar = ({ selectedTask, onClose }: { selectedTask: AvailableTask | null; onClose: () => void; }) => {
    if (!selectedTask) return null;

    return (
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="absolute top-0 right-0 h-full w-[350px] bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col"
        >
            <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <selectedTask.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-bold">{selectedTask.name}</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <p className="text-sm text-neutral-400">Configure the settings for your task below.</p>
                <div>
                  <label className="text-xs font-medium text-neutral-400">Message</label>
                  <textarea className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2 mt-1 text-sm focus:ring-primary focus:border-primary" defaultValue={`This is a test message from ${selectedTask.name}`}></textarea>
                </div>
            </div>
            <div className="p-4 border-t border-neutral-800 flex justify-end gap-2">
                <Button variant="secondary">Test Message</Button>
                <Button>Save Template</Button>
            </div>
        </motion.div>
    )
}

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [selectedTask, setSelectedTask] = useState<AvailableTask | null>(null);

  const addStep = (task: AvailableTask) => {
    const newStep: WorkflowStep = { ...task, instanceId: Date.now(), y: steps.length * 140 };
    setSteps([...steps, newStep]);
    setSelectedTask(task);
  };

  const removeStep = (instanceId: number) => {
    setSteps(steps.filter((step) => step.instanceId !== instanceId));
  };
  
  return (
    <div className="flex w-full h-full bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden relative">
        {/* Left Toolbar */}
        <div className="w-16 bg-neutral-950/50 border-r border-neutral-800 flex flex-col items-center p-2 gap-2">
            {availableTasks.map(task => (
                <Button key={task.id} variant="ghost" size="icon" className="h-12 w-12" onClick={() => addStep(task)} title={`Add ${task.name}`}>
                    <task.icon className="h-6 w-6"/>
                </Button>
            ))}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative overflow-auto p-8">
            <div className="relative w-max mx-auto">
                <AnimatePresence>
                    {steps.map((step, index) => (
                         <div key={step.instanceId} className="relative mb-12">
                             <Node step={step} onRemove={removeStep} />
                             {index > 0 && <ConnectionLine fromY={steps[index-1].y} toY={step.y} />}
                         </div>
                    ))}
                </AnimatePresence>

                {steps.length === 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-neutral-500">
                        <p>Add a task from the toolbar to get started.</p>
                    </div>
                )}
            </div>
        </div>

        {/* Configuration Sidebar */}
        <AnimatePresence>
            {selectedTask && <ConfigurationSidebar selectedTask={selectedTask} onClose={() => setSelectedTask(null)} />}
        </AnimatePresence>

        {/* Top Buttons */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
            <Button variant="secondary">Save</Button>
            <Button>Publish</Button>
        </div>
    </div>
  );
}
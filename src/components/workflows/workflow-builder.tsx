
"use client";

import { useState } from "react";
import { availableTasks } from "@/lib/data";
import type { AvailableTask } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, X, Settings } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type WorkflowStep = AvailableTask & { instanceId: number; position: { x: number; y: number } };

const Node = ({ step, onRemove, onSelect, isSelected }: { step: WorkflowStep; onRemove: (id: number) => void; onSelect: (task: AvailableTask) => void; isSelected: boolean; }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            drag
            dragMomentum={false}
            onDragEnd={(event, info) => {
                // This is a simplified drag handler. A real implementation would update state.
                // For this interactive mock, the drag is visual only.
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`absolute group cursor-grab active:cursor-grabbing w-72 bg-card border rounded-lg shadow-lg flex items-start gap-4 p-4 ${isSelected ? 'border-primary shadow-primary/20' : 'border-border'}`}
            style={{ x: step.position.x, y: step.position.y }}
            onClick={() => onSelect(step)}
        >
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            </div>
             <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-muted-foreground" />
            </div>
            
            <step.icon className="h-6 w-6 text-primary mt-1" />

            <div className="flex-1">
                <p className="font-bold text-card-foreground">{step.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            </div>
            
            <div className="absolute -top-3 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => {e.stopPropagation(); onSelect(step);}}>
                    <Settings className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/20 hover:text-destructive" onClick={(e) => {e.stopPropagation(); onRemove(step.instanceId);}}>
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
};


const ConnectionLine = ({ from, to }: { from: {x:number, y:number}, to: {x:number, y:number} }) => {
    const fromX = from.x + 288; // width of node
    const fromY = from.y + 36; // vertical center of node
    const toX = to.x;
    const toY = to.y + 36; // vertical center of node

    const pathData = `M ${fromX} ${fromY} C ${fromX + 50} ${fromY}, ${toX - 50} ${toY}, ${toX} ${toY}`;

    return (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible">
            <motion.path 
                d={pathData} 
                stroke="hsl(var(--border))" 
                strokeWidth="2" 
                fill="none" 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
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
            className="absolute top-0 right-0 h-full w-[350px] bg-background/80 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col z-20"
        >
            <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <selectedTask.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-lg font-bold">{selectedTask.name}</h3>
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5"/></Button>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                <p className="text-sm text-muted-foreground">Configure the settings for your task below.</p>
                <div>
                  <label className="text-xs font-medium text-muted-foreground">Message</label>
                  <textarea className="w-full bg-secondary border border-border rounded-md p-2 mt-1 text-sm focus:ring-primary focus:border-primary" defaultValue={`This is a test message from ${selectedTask.name}`}></textarea>
                </div>
            </div>
            <div className="p-4 border-t border-border flex justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>Cancel</Button>
                <Button>Save</Button>
            </div>
        </motion.div>
    )
}

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [selectedTask, setSelectedTask] = useState<AvailableTask | null>(null);

  const addStep = (task: AvailableTask) => {
    const yOffset = steps.length * 120;
    const xOffset = steps.length * 50;
    const newStep: WorkflowStep = { ...task, instanceId: Date.now(), position: { x: xOffset, y: yOffset } };
    setSteps([...steps, newStep]);
    setSelectedTask(task);
  };

  const removeStep = (instanceId: number) => {
    setSteps(currentSteps => currentSteps.filter((step) => step.instanceId !== instanceId));
    setSelectedTask(null);
  };
  
  return (
    <div className="flex w-full h-full bg-card/50 rounded-lg border border-border overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        {/* Left Toolbar */}
        <div className="w-16 bg-background/50 border-r border-border flex flex-col items-center p-2 gap-2 z-10">
            {availableTasks.map(task => (
                <Button key={task.id} variant="ghost" size="icon" className="h-12 w-12 flex-col" onClick={() => addStep(task)} title={`Add ${task.name}`}>
                    <task.icon className="h-5 w-5"/>
                    <span className="text-xs mt-1 text-muted-foreground">{task.name.split(' ')[0]}</span>
                </Button>
            ))}
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative overflow-auto p-8 z-10">
            <AnimatePresence>
                {steps.map((step, index) => (
                    <Node key={step.instanceId} step={step} onRemove={removeStep} onSelect={setSelectedTask} isSelected={selectedTask?.id === step.id && selectedTask?.name === step.name}/>
                ))}
            </AnimatePresence>

            <AnimatePresence>
                {steps.slice(1).map((step, index) => {
                    const prevStep = steps[index];
                    return <ConnectionLine key={`${prevStep.instanceId}-${step.instanceId}`} from={prevStep.position} to={step.position} />
                })}
            </AnimatePresence>

            {steps.length === 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground pointer-events-none">
                    <p className="font-medium">Workflow Canvas</p>
                    <p className="text-sm">Add an agent from the toolbar to get started.</p>
                </div>
            )}
        </div>

        {/* Configuration Sidebar */}
        <AnimatePresence>
            {selectedTask && <ConfigurationSidebar selectedTask={selectedTask} onClose={() => setSelectedTask(null)} />}
        </AnimatePresence>

        {/* Top Buttons */}
        <div className="absolute top-4 right-4 z-20 flex gap-2" style={{right: selectedTask ? '370px' : '1rem', transition: 'right 0.35s ease-in-out'}}>
            <Button variant="outline">Save Draft</Button>
            <Button>Publish Workflow</Button>
        </div>
    </div>
  );
}

    
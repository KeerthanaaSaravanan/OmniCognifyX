
"use client";

import { useState, useCallback, useMemo } from "react";
import { availableTasks } from "@/lib/data";
import type { AvailableTask } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, X, Settings, MousePointer2 } from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import WorkflowSummaryModal from "./workflow-summary-modal";

type WorkflowStep = AvailableTask & {
  instanceId: string;
  position: { x: number; y: number };
};

type WorkflowSummary = {
    name: string;
    tasks: number;
    agents: string[];
    createdAt: Date;
};


const Node = ({
  step,
  onRemove,
  onSelect,
  isSelected,
  onPositionChange
}: {
  step: WorkflowStep;
  onRemove: (id: string) => void;
  onSelect: (task: WorkflowStep) => void;
  isSelected: boolean;
  onPositionChange: (id: string, position: { x: number; y: number }) => void;
}) => {
  const dragControls = useDragControls();

  return (
    <motion.div
      key={step.instanceId}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      drag
      dragListener={false}
      dragControls={dragControls}
      onDragEnd={(event, info) => {
        onPositionChange(step.instanceId, { x: step.position.x + info.offset.x, y: step.position.y + info.offset.y });
      }}
      dragMomentum={false}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`absolute group w-72 bg-card border rounded-xl flex items-start gap-4 p-4 shadow-lg ${isSelected ? 'border-primary ring-2 ring-primary/50 shadow-primary/20' : 'hover:shadow-xl transition-shadow'}`}
      style={{
        left: step.position.x,
        top: step.position.y,
        cursor: 'default',
        borderRadius: '12px'
      }}
      onClick={() => onSelect(step)}
    >
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
      </div>
      <div className="absolute -right-3 top-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-background border flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-muted-foreground/50" />
      </div>

      <div className={`flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/50`}>
        <step.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>


      <div className="flex-1">
        <p className="font-bold text-card-foreground text-[18px]">{step.name}</p>
        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
      </div>

      <div 
        onPointerDown={(e) => {
            e.stopPropagation();
            dragControls.start(e, { snapToCursor: false })
        }}
        className="absolute -top-4 left-2 p-2 cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <MousePointer2 className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="absolute -top-3 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={(e) => { e.stopPropagation(); onSelect(step); }}>
          <Settings className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10 hover:text-destructive" onClick={(e) => { e.stopPropagation(); onRemove(step.instanceId); }}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const ConnectionLine = ({ from, to }: { from: { x: number; y: number }, to: { x: number; y: number } }) => {
  const fromX = from.x + 288; // width of node
  const fromY = from.y + 46; // vertical center of node
  const toX = to.x;
  const toY = to.y + 46;

  const pathData = `M ${fromX} ${fromY} C ${fromX + 60} ${fromY}, ${toX - 60} ${toY}, ${toX} ${toY}`;

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
       <motion.circle
        cx={toX}
        cy={toY}
        r="4"
        fill="hsl(var(--primary))"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
      />
    </svg>
  );
};

const ConfigurationSidebar = ({ selectedTask, onClose }: { selectedTask: WorkflowStep | null; onClose: () => void; }) => {
  if (!selectedTask) return null;

  return (
    <motion.div
      key={selectedTask.instanceId}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      className="absolute top-0 right-0 h-full w-[350px] bg-background/80 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col z-30"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50`}>
            <selectedTask.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="text-lg font-bold">{selectedTask.name}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <p className="text-sm text-muted-foreground">Configure the settings for your task below.</p>
        <div>
          <label className="text-xs font-medium text-muted-foreground">Message</label>
          <textarea className="w-full bg-secondary border-input rounded-md p-2 mt-1 text-sm focus:ring-primary focus:border-primary" defaultValue={`This is a test message from ${selectedTask.name}`}></textarea>
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
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [publishedWorkflow, setPublishedWorkflow] = useState<WorkflowSummary | null>(null);


  const addStep = (task: AvailableTask) => {
    const yOffset = steps.length * 150; // Increased vertical spacing
    const xOffset = 50 + (steps.length % 2) * 350; // Stagger initial positions

    const newStep: WorkflowStep = {
      ...task,
      instanceId: `${task.id}-${Date.now()}`,
      position: { x: xOffset, y: yOffset }
    };

    setSteps(currentSteps => [...currentSteps, newStep]);
    setSelectedStep(newStep);
  };

  const removeStep = (instanceId: string) => {
    setSteps(currentSteps => {
        if (selectedStep?.instanceId === instanceId) {
            setSelectedStep(null);
        }
        return currentSteps.filter((step) => step.instanceId !== instanceId)
    });
  };

  const handlePositionChange = useCallback((id: string, newPosition: { x: number; y: number }) => {
    setSteps(currentSteps =>
      currentSteps.map(step =>
        step.instanceId === id
          ? { ...step, position: {x: newPosition.x, y: newPosition.y} }
          : step
      )
    );
  }, []);

  const connections = useMemo(() => {
    return steps.slice(0, -1).map((step, index) => {
        const nextStep = steps[index + 1];
        if (!step || !nextStep) return null;
        return { from: step.position, to: nextStep.position, id: `${step.instanceId}-${nextStep.instanceId}` };
    }).filter(Boolean) as { from: {x: number, y: number}, to: {x: number, y: number}, id: string}[];
  }, [steps]);
  
  const handlePublish = () => {
    if (steps.length === 0) {
        // You might want to show a toast or message here
        return;
    }
    // Simulate successful publish
    const workflowData = {
        name: `My New Workflow #${Math.floor(Math.random() * 1000)}`,
        tasks: steps.length,
        agents: steps.map(s => s.name),
        createdAt: new Date(),
    };
    setPublishedWorkflow(workflowData);
    setIsSummaryModalOpen(true);
  };


  return (
    <div className="flex w-full h-full rounded-lg overflow-hidden">
      {/* Left Toolbar */}
      <div className="w-16 bg-background/70 backdrop-blur-sm border-r border-border flex flex-col items-center py-4 gap-2 z-20">
        {availableTasks.map(task => (
          <Button key={task.id} variant="ghost" size="icon" className="h-14 w-14 flex-col rounded-xl" onClick={() => addStep(task)} title={`Add ${task.name}`}>
            <task.icon className="h-5 w-5" />
            <span className="text-xs mt-1 text-muted-foreground">{task.name.split(' ')[0]}</span>
          </Button>
        ))}
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative overflow-auto z-10 bg-[#E8F0FA] dark:bg-gray-950/20" id="canvas" onClick={(e) => { if(e.target === e.currentTarget) setSelectedStep(null)}}>
        <div className="absolute inset-0 bg-dots" />
        <style jsx>{`
            .bg-dots {
                background-color: #E8F0FA;
                background-image: radial-gradient(rgba(150,170,190,0.4) 1px, transparent 0);
                background-size: 25px 25px;
            }
            .dark .bg-dots {
                background-color: transparent;
                background-image: radial-gradient(hsl(var(--border) / 0.2) 1px, transparent 0);
            }
        `}</style>
        
         <AnimatePresence>
          {connections.map(conn => (
            <ConnectionLine key={conn.id} from={conn.from} to={conn.to} />
          ))}
        </AnimatePresence>

        <AnimatePresence>
          {steps.map(step => (
            <Node
              key={step.instanceId}
              step={step}
              onRemove={removeStep}
              onSelect={setSelectedStep}
              isSelected={selectedStep?.instanceId === step.instanceId}
              onPositionChange={handlePositionChange}
            />
          ))}
        </AnimatePresence>

        {steps.length === 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-muted-foreground pointer-events-none flex flex-col items-center">
            <div className="w-[400px] h-[200px] border-2 border-dashed border-border/80 rounded-2xl flex items-center justify-center p-8">
                <div>
                    <h3 className="text-lg font-bold font-headline text-foreground">TaskFlow Canvas</h3>
                    <p className="text-sm font-medium">Add an agent from the toolbar to get started.</p>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Sidebar */}
      <AnimatePresence>
        {selectedStep && <ConfigurationSidebar selectedTask={selectedStep} onClose={() => setSelectedStep(null)} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {isSummaryModalOpen && publishedWorkflow && (
            <WorkflowSummaryModal
                isOpen={isSummaryModalOpen}
                onClose={() => setIsSummaryModalOpen(false)}
                workflow={publishedWorkflow}
            />
        )}
      </AnimatePresence>

      {/* Top Buttons */}
      <div className="absolute top-4 right-4 z-20 flex gap-2" style={{ right: selectedStep ? '370px' : '1rem', transition: 'right 0.35s ease-in-out' }}>
        <Button variant="outline" className="bg-white">Save Draft</Button>
        <Button onClick={handlePublish}>Publish Workflow</Button>
      </div>
    </div>
  );
}

    
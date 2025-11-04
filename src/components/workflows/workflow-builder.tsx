

"use client";

import { useState, useCallback, useMemo, useContext } from "react";
import { availableTasks, workflowTemplates } from "@/lib/data";
import type { AvailableTask } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, X, Settings, MousePointer2, Home, GitBranch, Repeat, GitMerge, Puzzle, ZoomIn, ZoomOut, Minimize, Book, Wand2 } from "lucide-react";
import { AnimatePresence, motion, useDragControls } from "framer-motion";
import WorkflowSummaryModal from "./workflow-summary-modal";
import { WorkflowContext } from "@/context/workflow-context";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import WorkflowTemplateModal from "./workflow-template-modal";

type WorkflowStep = AvailableTask & {
  instanceId: string;
  position: { x: number; y: number };
  config?: any;
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

  const nodeColors = {
      agent: 'primary',
      logic: 'amber-500'
  }

  const bgColor = step.type === 'logic' ? 'bg-amber-500/10' : 'bg-primary/10';
  const textColor = step.type === 'logic' ? 'text-amber-500' : 'text-primary';

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

      <div className={`flex items-center justify-center h-10 w-10 rounded-lg ${bgColor}`}>
        <step.icon className={`h-6 w-6 ${textColor}`} />
      </div>

      <div className="flex-1">
        <p className="font-bold text-card-foreground text-base">{step.name}</p>
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

const ConfigurationSidebar = ({ selectedTask, onClose, onSave }: { selectedTask: WorkflowStep | null; onClose: () => void; onSave: (id: string, config: any) => void }) => {
  const [config, setConfig] = useState(selectedTask?.config || {});
  
  if (!selectedTask) return null;

  const handleSave = () => {
    onSave(selectedTask.instanceId, config);
    onClose();
  }

  const renderConfig = () => {
      switch(selectedTask.id) {
          case 'logic-01': // Decision Node
            return (
                <div className="space-y-4">
                    <div>
                        <Label>Condition</Label>
                        <Input placeholder="e.g., data.integrity_score > 90" className="mt-1" defaultValue={config.condition}/>
                    </div>
                    <p className="text-xs text-muted-foreground">Define the condition for the 'true' path. If it fails, the 'false' path is taken (if connected).</p>
                </div>
            );
          case 'logic-02': // Loop Node
             return (
                <div className="space-y-4">
                    <div>
                        <Label>Loop Type</Label>
                        <RadioGroup defaultValue={config.loopType || "count"} className="mt-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="count" id="count" />
                                <Label htmlFor="count">Fixed Count</Label>
                            </div>
                             <div className="flex items-center space-x-2">
                                <RadioGroupItem value="collection" id="collection" />
                                <Label htmlFor="collection">For Each Item</Label>
                            </div>
                        </RadioGroup>
                    </div>
                     <div>
                        <Label>Value</Label>
                        <Input placeholder="e.g., 5 or {{data.items}}" className="mt-1" defaultValue={config.value}/>
                    </div>
                </div>
            );
          case 'logic-04': // Trigger Node
            return (
                <div className="space-y-4">
                     <div>
                        <Label>Event Source</Label>
                        <Input placeholder="e.g., DataSense" className="mt-1" defaultValue={config.eventSource}/>
                    </div>
                     <div>
                        <Label>Event Name</Label>
                        <Input placeholder="e.g., profiling.complete" className="mt-1" defaultValue={config.eventName}/>
                    </div>
                </div>
            )
          default:
            return (
                <div>
                  <Label>Message</Label>
                  <Textarea className="w-full bg-secondary border-input rounded-md p-2 mt-1 text-sm focus:ring-primary focus:border-primary" defaultValue={`This is a test message from ${selectedTask.name}`}></Textarea>
                </div>
            )
      }
  }

  return (
    <motion.div
      key={selectedTask.instanceId}
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 350, damping: 35 }}
      className="absolute top-0 right-0 h-full w-[350px] bg-card/80 backdrop-blur-xl border-l border-border shadow-2xl flex flex-col z-30"
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10`}>
            <selectedTask.icon className="h-5 w-5 text-primary" />
          </div>
          <h3 className="text-lg font-bold">{selectedTask.name}</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}><X className="h-5 w-5" /></Button>
      </div>
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        <p className="text-sm text-muted-foreground">Configure the settings for your task below.</p>
        {renderConfig()}
      </div>
      <div className="p-4 border-t border-border flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </motion.div>
  )
}

export default function WorkflowBuilder() {
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const [selectedStep, setSelectedStep] = useState<WorkflowStep | null>(null);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [publishedWorkflow, setPublishedWorkflow] = useState<WorkflowSummary | null>(null);

  const { addWorkflow } = useContext(WorkflowContext);
  const { toast } = useToast();

  const addStep = (task: AvailableTask, position?: { x: number, y: number }) => {
    const defaultY = steps.length * 150;
    const defaultX = 50 + (steps.length % 3) * 350;

    const newStep: WorkflowStep = {
      ...task,
      instanceId: `${task.id}-${Date.now()}`,
      position: position || { x: defaultX, y: defaultY }
    };

    setSteps(currentSteps => [...currentSteps, newStep]);
    setSelectedStep(newStep);
  };
  
  const loadTemplate = (nodeIds: string[]) => {
    setSteps([]); // Clear existing steps
    let xOffset = 50;
    let yOffset = 50;
    nodeIds.forEach(nodeId => {
      const task = availableTasks.find(t => t.id === nodeId);
      if(task) {
        addStep(task, { x: xOffset, y: yOffset });
        xOffset += 350;
      }
    });
    setIsTemplateModalOpen(false);
    toast({
        title: "Template Loaded",
        description: "The workflow has been set up on your canvas.",
    });
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

  const handleSaveConfig = (id: string, config: any) => {
    setSteps(currentSteps =>
        currentSteps.map(step =>
            step.instanceId === id ? { ...step, config } : step
        )
    );
    toast({
        title: "Configuration Saved",
        description: `Settings for ${steps.find(s => s.instanceId === id)?.name} have been updated.`,
    })
  };

  const connections = useMemo(() => {
    return steps.slice(0, -1).map((step, index) => {
        const nextStep = steps[index + 1];
        if (!step || !nextStep) return null;
        return { from: step.position, to: nextStep.position, id: `${step.instanceId}-${nextStep.instanceId}` };
    }).filter(Boolean) as { from: {x: number, y: number}, to: {x: number, y: number}, id: string}[];
  }, [steps]);
  
  const handlePublish = () => {
    if (steps.length === 0) {
        toast({
            variant: "destructive",
            title: "Cannot Publish Empty Workflow",
            description: "Please add at least one agent to the canvas.",
        });
        return;
    }
    
    const name = `My New Workflow #${Math.floor(Math.random() * 1000)}`;
    const workflowData = {
        name: name,
        tasks: steps.length,
        agents: steps.map(s => s.name),
        createdAt: new Date(),
    };
    
    addWorkflow({
        id: `wf-${Date.now()}`,
        name: name,
        status: 'Idle',
        lastRun: 'Just now',
        tasks: steps.length,
        duration: '0s'
    });

    setPublishedWorkflow(workflowData);
    setIsSummaryModalOpen(true);

    toast({
        title: "Workflow Published!",
        description: `${name} has been added to Recent Workflows on the dashboard.`,
    });
  };


  return (
    <div className="flex w-full h-full rounded-lg overflow-hidden bg-background">
      {/* Left Toolbar */}
      <div className="w-20 bg-card/60 backdrop-blur-sm border-r border-border flex flex-col items-center py-4 gap-2 z-20">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-16 w-16 flex-col rounded-xl" title="Back to Dashboard">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xs mt-1 text-muted-foreground">Home</span>
          </Button>
        </Link>
        <div className="flex-1 flex flex-col items-center justify-start gap-2 pt-8">
            <p className="text-xs font-semibold text-muted-foreground mb-2">AGENTS</p>
            {availableTasks.filter(t => t.type === 'agent').map(task => (
            <Button key={task.id} variant="ghost" size="icon" className="h-16 w-16 flex-col rounded-xl" onClick={() => addStep(task)} title={`Add ${task.name}`}>
                <task.icon className="h-6 w-6 text-primary" />
                <span className="text-xs mt-1 text-muted-foreground">{task.name.split(' ')[0]}</span>
            </Button>
            ))}
             <p className="text-xs font-semibold text-muted-foreground mt-6 mb-2">LOGIC</p>
            {availableTasks.filter(t => t.type === 'logic').map(task => (
            <Button key={task.id} variant="ghost" size="icon" className="h-16 w-16 flex-col rounded-xl" onClick={() => addStep(task)} title={`Add ${task.name}`}>
                <task.icon className="h-6 w-6 text-amber-500" />
                <span className="text-xs mt-1 text-muted-foreground">{task.name.split(' ')[0]}</span>
            </Button>
            ))}
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative overflow-hidden z-10" id="canvas" onClick={(e) => { if(e.target === e.currentTarget) setSelectedStep(null)}}>
        <div className="absolute inset-0 bg-grid-pattern" />
        
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
                    <p className="text-sm font-medium">Add an agent from the toolbar or load a template to get started.</p>
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Sidebar */}
      <AnimatePresence>
        {selectedStep && <ConfigurationSidebar selectedTask={selectedStep} onClose={() => setSelectedStep(null)} onSave={handleSaveConfig} />}
      </AnimatePresence>
      
      <AnimatePresence>
        {isSummaryModalOpen && publishedWorkflow && (
            <WorkflowSummaryModal
                isOpen={isSummaryModalOpen}
                onClose={() => setIsSummaryModalOpen(false)}
                workflow={publishedWorkflow}
            />
        )}
         {isTemplateModalOpen && (
            <WorkflowTemplateModal
                isOpen={isTemplateModalOpen}
                onClose={() => setIsTemplateModalOpen(false)}
                onSelectTemplate={loadTemplate}
            />
        )}
      </AnimatePresence>

      {/* Top Buttons */}
      <div className="absolute top-4 z-20 flex gap-2" style={{ right: selectedStep ? '370px' : '1rem', transition: 'right 0.35s ease-in-out' }}>
        <Button variant="outline" className="bg-card" onClick={() => setIsTemplateModalOpen(true)}>
            <Book className="mr-2 h-4 w-4" /> Templates
        </Button>
        <Button variant="outline" className="bg-card">Save Draft</Button>
        <Button onClick={handlePublish}>Publish Workflow</Button>
      </div>

      <div className="absolute top-4 left-24 z-20 flex items-center gap-2">
        <h2 className="text-lg font-bold text-foreground">OmniMind Workflow Orchestrator</h2>
      </div>
      
       <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1 bg-card/80 backdrop-blur-sm p-1 rounded-lg border">
          <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomIn className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><ZoomOut className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8"><Minimize className="h-4 w-4" /></Button>
        </div>

        <div className="absolute bottom-4 left-24 z-20 p-2 rounded-lg bg-card/80 backdrop-blur-sm border flex items-center gap-2">
            <div className="p-2 rounded-full bg-blue-500/10 animate-pulse">
                <Wand2 className="h-5 w-5 text-primary" />
            </div>
            <div>
                <p className="text-sm font-semibold">OmniFlow AI Assistant</p>
                <p className="text-xs text-muted-foreground">Ready to help you build.</p>
            </div>
        </div>
    </div>
  );
}

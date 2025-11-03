"use client";

import { useState, useTransition } from "react";
import { availableTasks } from "@/lib/data";
import type { AvailableTask } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { PlusCircle, GripVertical, Trash2, Bot, Sparkles, Loader2, Wand2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { getAIResult } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type WorkflowStep = AvailableTask & { instanceId: number };

export default function WorkflowBuilder() {
  const [workflowName, setWorkflowName] = useState("My New Workflow");
  const [steps, setSteps] = useState<WorkflowStep[]>([]);
  const { toast } = useToast();

  const addStep = (task: AvailableTask) => {
    const newStep: WorkflowStep = { ...task, instanceId: Date.now() };
    setSteps([...steps, newStep]);
  };

  const removeStep = (instanceId: number) => {
    setSteps(steps.filter((step) => step.instanceId !== instanceId));
  };
  
  const handleSave = () => {
    toast({
      title: "Workflow Saved!",
      description: `Your workflow "${workflowName}" has been saved successfully.`,
    })
  }

  return (
    <div className="grid md:grid-cols-3 gap-8 items-start">
      {/* Available Tasks Panel */}
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Available Tasks</CardTitle>
          <CardDescription>Drag or click to add tasks to your workflow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {availableTasks.map((task) => (
            <div key={task.id} className="flex items-center gap-2 p-3 rounded-lg border bg-card hover:bg-muted transition-colors">
              <task.icon className="h-6 w-6 text-primary" />
              <div className="flex-1">
                <p className="font-medium">{task.name}</p>
                <p className="text-sm text-muted-foreground">{task.description}</p>
              </div>
              <Button size="icon" variant="ghost" onClick={() => addStep(task)}>
                <PlusCircle className="h-5 w-5" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Workflow Canvas Panel */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardContent className="p-6">
            <Input
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="text-2xl font-bold border-none shadow-none focus-visible:ring-0 p-0"
            />
          </CardContent>
        </Card>

        <div className="space-y-4">
            {steps.length === 0 && (
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <h3 className="text-lg font-medium text-muted-foreground">Workflow Canvas</h3>
                    <p className="text-sm text-muted-foreground">Add tasks from the left panel to begin.</p>
                </div>
            )}
            {steps.map((step, index) => (
                <div key={step.instanceId} className="flex items-center gap-4">
                    <div className="text-muted-foreground">{index + 1}</div>
                    <Card className="flex-1">
                        <CardHeader className="flex flex-row items-center gap-4 p-4">
                            <GripVertical className="h-5 w-5 text-muted-foreground cursor-grab" />
                            <step.icon className="h-6 w-6 text-primary" />
                            <div className="flex-1">
                                <CardTitle className="text-base">{step.name}</CardTitle>
                            </div>
                            <TaskConfigurationDialog step={step} />
                            <Button variant="ghost" size="icon" onClick={() => removeStep(step.instanceId)}>
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
        
        {steps.length > 0 && (
            <div className="flex justify-end">
                <Button onClick={handleSave}>Save Workflow</Button>
            </div>
        )}
      </div>
    </div>
  );
}

function TaskConfigurationDialog({ step }: { step: WorkflowStep }) {
    const { toast } = useToast();
    const [inputData, setInputData] = useState('Example: "The new OmniMind platform is incredibly intuitive and powerful!"');
    const [aiResult, setAiResult] = useState<string | null>(null);
    const [recommendation, setRecommendation] = useState<string | null>(null);
    const [isSimulating, startSimulationTransition] = useTransition();
    const [isRecommending, startRecommendationTransition] = useTransition();

    const handleSimulation = () => {
        startSimulationTransition(async () => {
            setAiResult(null);
            const response = await getAIResult({ taskType: step.name, inputData });
            if ('result' in response) {
                setAiResult(response.result);
            } else {
                toast({ variant: 'destructive', title: 'Simulation Failed', description: response.error });
            }
        });
    }

    const handleRecommendation = () => {
        startRecommendationTransition(async () => {
            setRecommendation(null);
            const response = await getAIResult({ taskType: 'Parameter Recommendation', inputData: `Suggest optimal configurations and parameters for the AI task: ${step.name}. Consider performance and cost-efficiency.` });
            if ('result' in response) {
                setRecommendation(response.result);
            } else {
                toast({ variant: 'destructive', title: 'Recommendation Failed', description: response.error });
            }
        })
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Configure</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Configure: {step.name}</DialogTitle>
          <DialogDescription>
            Set parameters and simulate this workflow step.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div className="space-y-2">
                <h4 className="font-medium">AI Parameter Recommendations</h4>
                <Button variant="outline" size="sm" onClick={handleRecommendation} disabled={isRecommending}>
                    {isRecommending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                    Get AI Recommendations
                </Button>
                {isRecommending && <p className="text-sm text-muted-foreground">Getting recommendations...</p>}
                {recommendation && (
                    <Alert className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                        <Sparkles className="h-4 w-4 text-blue-500" />
                        <AlertTitle className="text-blue-700 dark:text-blue-300">AI Suggestion</AlertTitle>
                        <AlertDescription className="text-blue-600 dark:text-blue-400">
                           {recommendation}
                        </AlertDescription>
                    </Alert>
                )}
            </div>
            <Separator/>
            <div className="space-y-2">
                <h4 className="font-medium">Simulate Task</h4>
                <Textarea placeholder="Enter input data for simulation" value={inputData} onChange={e => setInputData(e.target.value)} />
                <Button onClick={handleSimulation} disabled={isSimulating}>
                    {isSimulating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Bot className="mr-2 h-4 w-4" />}
                    Run Simulation
                </Button>

                {isSimulating && <p className="text-sm text-muted-foreground">Simulating AI task...</p>}
                {aiResult && (
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Simulation Result</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{aiResult}</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

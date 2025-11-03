import WorkflowBuilder from "@/components/workflows/workflow-builder";

export default function CreateWorkflowPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Create New Workflow</h1>
        <p className="text-muted-foreground">
          Design and build your automated process by adding tasks.
        </p>
      </div>
      <WorkflowBuilder />
    </div>
  );
}

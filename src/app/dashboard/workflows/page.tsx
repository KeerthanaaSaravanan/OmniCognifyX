import { Button } from "@/components/ui/button";
import WorkflowsDataTable from "@/components/workflows/workflows-data-table";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function WorkflowsPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Workflows</h1>
          <p className="text-muted-foreground">
            Manage, create, and monitor your automated workflows.
          </p>
        </div>
        <Link href="/dashboard/workflows/create">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Workflow
            </Button>
        </Link>
      </div>
      
      <WorkflowsDataTable />
    </div>
  );
}

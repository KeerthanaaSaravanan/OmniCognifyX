import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import DataSourcesGrid from "@/components/data-sources/data-sources-grid";

export default function DataSourcesPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Data Sources</h1>
          <p className="text-muted-foreground">
            Manage your simulated data inputs for workflows.
          </p>
        </div>
        <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Source
        </Button>
      </div>
      
      <DataSourcesGrid />
    </div>
  );
}

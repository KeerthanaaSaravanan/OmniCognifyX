

import StatsCards from "@/components/dashboard/stats-cards";
import AgentModules from "@/components/dashboard/agent-modules";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import WorkflowsDataTable from "@/components/workflows/workflows-data-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Orchestration Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time AI workflow automation overview
          </p>
        </div>
        <Link href="/dashboard/orchestration">
          <Button size="lg">
            <PlayCircle className="mr-2 h-5 w-5" />
            Show Orchestration Flow
          </Button>
        </Link>
      </div>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Workflows</h2>
          <WorkflowsDataTable />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-4">AI Agent Modules</h2>
          <AgentModules />
        </div>
      </div>
    </div>
  );
}

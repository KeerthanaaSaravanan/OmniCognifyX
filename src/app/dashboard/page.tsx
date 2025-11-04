
import StatsCards from "@/components/dashboard/stats-cards";
import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";
import WorkflowsDataTable from "@/components/workflows/workflows-data-table";
import DataSessionsTable from "@/components/dashboard/data-sessions-table";
import GovernanceReportsTable from "@/components/dashboard/governance-reports-table";

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

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Recent Workflows</h2>
          <WorkflowsDataTable />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight">Recent Data Sessions</h2>
          <DataSessionsTable />
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Governance Reports</h2>
        <GovernanceReportsTable />
      </div>
    </div>
  );
}

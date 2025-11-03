import StatsCards from "@/components/dashboard/stats-cards";
import RecentWorkflowsCard from "@/components/dashboard/recent-workflows-card";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your AI workflows.
        </p>
      </div>

      <StatsCards />

      <RecentWorkflowsCard />
    </div>
  );
}

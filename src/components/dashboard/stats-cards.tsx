import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, GitFork, Loader, XCircle } from "lucide-react";
import { workflows } from "@/lib/data";

export default function StatsCards() {
  const totalWorkflows = workflows.length;
  const completed = workflows.filter(w => w.status === 'Completed').length;
  const running = workflows.filter(w => w.status === 'Running').length;
  const failed = workflows.filter(w => w.status === 'Failed').length;

  const stats = [
    { title: "Total Workflows", value: totalWorkflows, icon: GitFork, color: "text-blue-500" },
    { title: "Completed", value: completed, icon: CheckCircle2, color: "text-green-500" },
    { title: "Running", value: running, icon: Loader, color: "text-yellow-500", className: "animate-spin" },
    { title: "Failed", value: failed, icon: XCircle, color: "text-red-500" },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-5 w-5 text-muted-foreground ${stat.color} ${stat.className ?? ''}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

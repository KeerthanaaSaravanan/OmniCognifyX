import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Check, GitFork, Shield, Zap } from "lucide-react";
import { workflows } from "@/lib/data";

const totalWorkflows = workflows.length;
const completed = workflows.filter(w => w.status === 'Completed').length;
const running = workflows.filter(w => w.status === 'Running').length;
const insights = 1; // mock
const complianceChecks = 0; // mock
const taskflowExecutions = 1; // mock


const stats = [
  { title: "DataSense Analyses", value: totalWorkflows, icon: Bot, color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950" },
  { title: "TaskFlow Executions", value: taskflowExecutions, icon: Zap, color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
  { title: "Insights Generated", value: insights, icon: GitFork, color: "text-indigo-500", bgColor: "bg-indigo-50 dark:bg-indigo-950" },
  { title: "Compliance Checks", value: complianceChecks, icon: Shield, color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950" },
];

export default function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
            <div className={`p-2 rounded-md ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

import { workflows } from "@/lib/data";
import type { WorkflowStatus } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const StatusBadge = ({ status }: { status: WorkflowStatus }) => {
  const variant = {
    Completed: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
    Running: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 animate-pulse",
    Failed: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
    Idle: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
  }[status];

  return <Badge className={`border-none ${variant}`}>{status}</Badge>;
};


export default function RecentWorkflowsCard() {
  const recentWorkflows = workflows.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Recent Workflows</CardTitle>
          <CardDescription>
            An overview of your most recently executed workflows.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="ml-auto gap-1" variant="outline">
          <Link href="/dashboard/workflows">
            View All
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-right">Last Run</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentWorkflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell>
                  <div className="font-medium">{workflow.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {workflow.tasks} tasks
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <StatusBadge status={workflow.status} />
                </TableCell>
                <TableCell className="text-right">{workflow.lastRun}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

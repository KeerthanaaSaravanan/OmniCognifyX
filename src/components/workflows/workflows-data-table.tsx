"use client";

import * as React from "react";
import { workflows } from "@/lib/data";
import type { WorkflowStatus } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "../ui/button";
import { MoreHorizontal, Play, Trash2, Edit } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";

const StatusBadge = ({ status }: { status: WorkflowStatus }) => {
    const variant = {
      Completed: "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300",
      Running: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 animate-pulse",
      Failed: "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300",
      Idle: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    }[status];
  
    return <Badge className={`border-none ${variant}`}>{status}</Badge>;
};

export default function WorkflowsDataTable() {
    const handleRun = (name: string) => {
        toast({
            title: "Simulating Workflow",
            description: `The "${name}" workflow is now running.`,
          })
    }

  return (
    <Card>
      <CardHeader>
        <CardTitle>All Workflows</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {workflows.map((workflow) => (
              <TableRow key={workflow.id}>
                <TableCell className="font-medium">{workflow.name}</TableCell>
                <TableCell>
                  <StatusBadge status={workflow.status} />
                </TableCell>
                <TableCell>{workflow.tasks}</TableCell>
                <TableCell>{workflow.duration}</TableCell>
                <TableCell>{workflow.lastRun}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem onSelect={() => handleRun(workflow.name)}><Play className="mr-2 h-4 w-4" /> Run Workflow</DropdownMenuItem>
                      <DropdownMenuItem><Edit className="mr-2 h-4 w-4" /> Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/60"><Trash2 className="mr-2 h-4 w-4" /> Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

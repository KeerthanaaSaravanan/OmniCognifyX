
"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { WorkflowContext } from "@/context/workflow-context";
import type { Workflow, WorkflowStatus } from "@/lib/data";
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
import { AnimatePresence, motion } from "framer-motion";

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
    const { workflows } = useContext(WorkflowContext);
    const [newItems, setNewItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        const latestWorkflow = workflows[0];
        if (latestWorkflow && latestWorkflow.lastRun === 'Just now') {
            const newId = latestWorkflow.id;
            setNewItems(prev => new Set(prev).add(newId));
            const timer = setTimeout(() => {
                setNewItems(prev => {
                    const updated = new Set(prev);
                    updated.delete(newId);
                    return updated;
                });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [workflows]);

    const handleRun = (name: string) => {
        toast({
            title: "Simulating Workflow",
            description: `The "${name}" workflow is now running.`,
          })
    }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative overflow-auto">
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
              <AnimatePresence initial={false}>
                {workflows.map((workflow) => (
                  <motion.tr
                    key={workflow.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                          {workflow.name}
                          {newItems.has(workflow.id) && (
                              <Badge className="bg-primary/20 text-primary-foreground">NEW</Badge>
                          )}
                      </div>
                    </TableCell>
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
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

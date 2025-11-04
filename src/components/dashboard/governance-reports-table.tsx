
"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { GovernanceContext } from "@/context/governance-context";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

export default function GovernanceReportsTable() {
    const { governanceReports } = useContext(GovernanceContext);
    const [newItems, setNewItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (governanceReports.length > 0) {
            const latestReport = governanceReports[0];
            if (latestReport && latestReport.scannedAt === 'Just now') {
                const newId = latestReport.id;
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
        }
    }, [governanceReports]);

  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative overflow-auto h-64">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Scan Type</TableHead>
                <TableHead>Confidence Score</TableHead>
                <TableHead>Issues Found</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Scanned At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {governanceReports.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center h-48 text-muted-foreground">
                            No governance reports yet. Run a validation scan to begin.
                        </TableCell>
                    </TableRow>
                )}
                {governanceReports.map((report) => (
                  <motion.tr
                    key={report.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                          {report.scanType}
                          {newItems.has(report.id) && (
                              <Badge className="bg-primary/20 text-primary-foreground">NEW</Badge>
                          )}
                      </div>
                    </TableCell>
                    <TableCell>{report.confidenceScore}%</TableCell>
                    <TableCell>{report.issuesFound}</TableCell>
                    <TableCell>
                        <Badge variant={report.status === 'Compliant' ? "default" : "destructive"} className={report.status === 'Compliant' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}>
                           {report.status}
                        </Badge>
                    </TableCell>
                    <TableCell>{report.scannedAt}</TableCell>
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

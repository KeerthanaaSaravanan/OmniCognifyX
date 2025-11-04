
"use client";

import * as React from "react";
import { useContext, useState, useEffect } from "react";
import { DataSessionContext } from "@/context/data-session-context";
import type { DataSession } from "@/lib/data";
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

export default function DataSessionsTable() {
    const { dataSessions } = useContext(DataSessionContext);
    const [newItems, setNewItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        if (dataSessions.length > 0) {
            const latestSession = dataSessions[0];
            if (latestSession && latestSession.analyzedAt === 'Just now') {
                const newId = latestSession.id;
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
    }, [dataSessions]);
    
  return (
    <Card>
      <CardContent className="p-0">
        <div className="relative overflow-auto h-80">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Integrity</TableHead>
                <TableHead>Analyzed At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence initial={false}>
                {dataSessions.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-48 text-muted-foreground">
                            No data sessions yet. Analyze a data source to begin.
                        </TableCell>
                    </TableRow>
                )}
                {dataSessions.map((session) => (
                  <motion.tr
                    key={session.id}
                    layout
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                          {session.source}
                          {newItems.has(session.id) && (
                              <Badge className="bg-primary/20 text-primary-foreground">NEW</Badge>
                          )}
                      </div>
                    </TableCell>
                    <TableCell>{session.records.toLocaleString()}</TableCell>
                    <TableCell>
                        <Badge variant={session.integrityScore > 90 ? "default" : "destructive"} className={session.integrityScore > 90 ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : ''}>
                           {session.integrityScore}%
                        </Badge>
                    </TableCell>
                    <TableCell>{session.analyzedAt}</TableCell>
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

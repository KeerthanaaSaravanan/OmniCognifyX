
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { workflowTemplates } from "@/lib/data";
import type { WorkflowTemplate } from "@/lib/data";
import { Check, ArrowRight, BookOpen } from "lucide-react";

interface WorkflowTemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (nodeIds: string[]) => void;
}

export default function WorkflowTemplateModal({ isOpen, onClose, onSelectTemplate }: WorkflowTemplateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />
          <DialogContent
            className="z-50 p-0 border-none shadow-2xl max-w-2xl bg-card"
            onInteractOutside={(e) => {
              if (!e.defaultPrevented) {
                onClose();
              }
              e.preventDefault();
            }}
          >
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="flex items-center gap-2 text-2xl"><BookOpen/> Workflow Templates</DialogTitle>
              <DialogDescription>
                Select a pre-built workflow blueprint to get started quickly.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 pt-0 max-h-[60vh] overflow-y-auto">
              {workflowTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  whileHover={{ scale: 1.03 }}
                  className="p-5 rounded-lg border bg-secondary/50 hover:bg-secondary hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between"
                  onClick={() => onSelectTemplate(template.nodes)}
                >
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{template.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-semibold text-primary">{template.nodes.length} Steps</span>
                    <Button size="sm" variant="ghost">Load <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t flex justify-end">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

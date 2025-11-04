
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, Share2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

type WorkflowSummary = {
    name: string;
    tasks: number;
    agents: string[];
    createdAt: Date;
};

interface WorkflowSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  workflow: WorkflowSummary | null;
}

export default function WorkflowSummaryModal({ isOpen, onClose, workflow }: WorkflowSummaryModalProps) {
  const router = useRouter();
  const { toast } = useToast();

  if (!workflow) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/dashboard/workflows`);
    toast({
        title: "Link Copied!",
        description: "A link to the workflow dashboard has been copied to your clipboard.",
    });
  }

  const handleViewDashboard = () => {
    onClose();
    router.push('/dashboard/workflows');
  }

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
            className="z-50 p-0 border-none shadow-2xl max-w-2xl bg-transparent"
            onInteractOutside={(e) => e.preventDefault()}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-xl overflow-hidden border border-blue-500/30"
            >
              <div className="absolute inset-0 w-full h-full bg-grid-pattern opacity-10" />
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl" />
              
              <div className="relative p-8">
                <div className="text-center">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="mx-auto h-16 w-16 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/50"
                    >
                        <CheckCircle className="h-8 w-8 text-green-400" />
                    </motion.div>
                  <DialogTitle asChild>
                    <h2 className="text-3xl font-bold mt-4 font-headline">Workflow Published Successfully</h2>
                  </DialogTitle>
                  <DialogDescription asChild>
                    <p className="text-lg text-blue-300/80 mt-1">Your orchestration is live and optimized.</p>
                  </DialogDescription>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-4 text-sm bg-white/5 p-6 rounded-lg border border-white/10">
                  <div className="space-y-1">
                    <p className="text-blue-300/60">Workflow Name</p>
                    <p className="font-semibold text-lg">{workflow.name}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-blue-300/60">Total Steps</p>
                    <p className="font-semibold text-lg">{workflow.tasks}</p>
                  </div>
                  <div className="col-span-2 space-y-1">
                    <p className="text-blue-300/60">Connected Agents</p>
                    <p className="font-semibold">{workflow.agents.join(" → ")}</p>
                  </div>
                   <div className="space-y-1">
                    <p className="text-blue-300/60">Status</p>
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                        <p className="font-semibold text-green-400">Active</p>
                    </div>
                  </div>
                   <div className="space-y-1">
                    <p className="text-blue-300/60">Published On</p>
                    <p className="font-semibold">{workflow.createdAt.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-8 flex justify-center gap-4">
                  <Button onClick={handleViewDashboard} className="bg-blue-600 hover:bg-blue-500 text-white font-semibold">View Dashboard</Button>
                  <Button onClick={handleShare} variant="outline" className="text-white border-white/20 hover:bg-white/10 hover:text-white"><Share2 className="mr-2 h-4 w-4"/> Share</Button>
                  <Button onClick={onClose} variant="ghost" className="hover:bg-white/10 hover:text-white">Close</Button>
                </div>

                <p className="absolute bottom-4 right-6 text-xs text-blue-400/30 font-medium">
                  🧩 Powered by IBM watsonx Orchestrate
                </p>
              </div>

               <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-4 right-4 text-white/50 hover:text-white">
                  <X className="h-5 w-5" />
               </Button>
            </motion.div>
             <style jsx>{`
            .bg-grid-pattern {
                background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
                background-size: 20px 20px;
            }
          `}</style>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

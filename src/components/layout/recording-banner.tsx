"use client";

import { useDemoMode } from "@/context/demo-mode-context";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";

export default function RecordingBanner() {
  const { isDemoMode } = useDemoMode();

  return (
    <AnimatePresence>
      {isDemoMode && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-purple-600 text-white overflow-hidden"
        >
          <div className="flex items-center justify-center gap-2 h-8">
            <Camera className="h-5 w-5" />
            <span className="font-semibold text-sm">Recording Mode Active</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

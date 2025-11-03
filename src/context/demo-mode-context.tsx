"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useToast } from "@/hooks/use-toast";
import { triggerDemo as triggerDemoAction } from "@/app/actions";
import { useRouter } from "next/navigation";

type DemoModeContextType = {
  isDemoMode: boolean;
  setIsDemoMode: (isDemoMode: boolean) => void;
};

const DemoModeContext = createContext<DemoModeContextType | undefined>(
  undefined
);

export function DemoModeProvider({ children }: { children: ReactNode }) {
  const [isDemoMode, setIsDemoModeState] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const setIsDemoMode = useCallback(async (enabled: boolean) => {
    setIsDemoModeState(enabled);
    if (enabled) {
      toast({
        title: "Demo Mode Activated!",
        description: "Automated workflow sequence will now begin.",
      });
      const result = await triggerDemoAction();
      if ("success" in result) {
        // Navigate to the orchestration page to show the demo
        router.push('/dashboard/orchestration');
      } else {
        toast({
          variant: "destructive",
          title: "Demo Trigger Failed",
          description: result.error,
        });
      }
    } else {
      toast({
        title: "Demo Mode Deactivated",
      });
    }
  }, [toast, router]);

  const value = { isDemoMode, setIsDemoMode };

  return (
    <DemoModeContext.Provider value={value}>
      {children}
    </DemoModeContext.Provider>
  );
}

export function useDemoMode() {
  const context = useContext(DemoModeContext);
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoModeProvider");
  }
  return context;
}

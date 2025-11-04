
'use client';

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { DemoModeProvider } from "@/context/demo-mode-context";
import RecordingBanner from "@/components/layout/recording-banner";
import { PageTransition } from "@/components/layout/page-transition";
import { cn } from "@/lib/utils";
import { WorkflowProvider } from "@/context/workflow-context";
import { DataSessionProvider } from "@/context/data-session-context";
import { GovernanceProvider } from "@/context/governance-context";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isWorkflowBuilder = pathname === '/dashboard/workflows/create';

  return (
    <WorkflowProvider>
      <DataSessionProvider>
        <GovernanceProvider>
          <DemoModeProvider>
            <SidebarProvider>
              <div className="flex min-h-screen bg-background">
                <AppSidebar />
                <div className="flex-1 flex flex-col">
                  <RecordingBanner />
                  <AppHeader />
                  <main className={cn(
                    "flex-1 p-6 md:p-8 bg-gray-50/50 dark:bg-card/40",
                    isWorkflowBuilder && "p-0 md:p-0"
                  )}>
                    <PageTransition>
                      <div className={cn("mx-auto max-w-screen-2xl h-full w-full", isWorkflowBuilder && "max-w-none")}>
                        {children}
                      </div>
                    </PageTransition>
                  </main>
                </div>
              </div>
            </SidebarProvider>
          </DemoModeProvider>
        </GovernanceProvider>
      </DataSessionProvider>
    </WorkflowProvider>
  );
}

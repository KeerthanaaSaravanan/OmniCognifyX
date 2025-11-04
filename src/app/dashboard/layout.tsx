
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

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isWorkflowBuilder = pathname === '/dashboard/workflows/create';

  return (
    <DemoModeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <RecordingBanner />
            <AppHeader />
            <main className={cn(
              "flex-1 flex",
              isWorkflowBuilder ? 'p-0' : 'p-6 md:p-8 bg-gray-50/50 dark:bg-gray-950/20'
            )}>
              <PageTransition>
                <div className={cn("h-full w-full", !isWorkflowBuilder && "mx-auto max-w-screen-2xl")}>
                    {children}
                </div>
              </PageTransition>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DemoModeProvider>
  );
}

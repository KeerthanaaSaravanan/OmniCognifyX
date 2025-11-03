import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { DemoModeProvider } from "@/context/demo-mode-context";
import RecordingBanner from "@/components/layout/recording-banner";
import { PageTransition } from "@/components/layout/page-transition";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DemoModeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen bg-background bg-gradient-to-br from-blue-900/10 via-transparent to-cyan-900/10 dark:from-blue-900/20 dark:via-transparent dark:to-cyan-900/20">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <RecordingBanner />
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <PageTransition>
                    {children}
                </PageTransition>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DemoModeProvider>
  );
}

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
        <div className="flex min-h-screen bg-background">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <RecordingBanner />
            <AppHeader />
            <main className="flex-1 p-6 md:p-8 lg:p-12 bg-gray-50/50 dark:bg-gray-950/20">
                <PageTransition>
                    <div className="mx-auto max-w-7xl">
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

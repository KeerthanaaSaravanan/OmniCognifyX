import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/app-sidebar";
import AppHeader from "@/components/layout/app-header";
import { DemoModeProvider } from "@/context/demo-mode-context";
import RecordingBanner from "@/components/layout/recording-banner";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DemoModeProvider>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <AppSidebar />
          <div className="flex-1 flex flex-col">
            <RecordingBanner />
            <AppHeader />
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DemoModeProvider>
  );
}

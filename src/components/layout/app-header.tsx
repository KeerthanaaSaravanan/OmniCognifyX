"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle, Video } from "lucide-react";
import Link from "next/link";
import { useDemoMode } from "@/context/demo-mode-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function AppHeader() {
  const { isDemoMode, setIsDemoMode } = useDemoMode();

  const handleDemoModeChange = (checked: boolean) => {
    setIsDemoMode(checked);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        {/* Placeholder for breadcrumbs or page title */}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center space-x-2">
            <Switch id="demo-mode" checked={isDemoMode} onCheckedChange={handleDemoModeChange} />
            <Label htmlFor="demo-mode" className="flex items-center gap-2 cursor-pointer">
                <Video className="h-5 w-5 text-purple-500"/>
                <span className="font-medium">Demo Mode</span>
            </Label>
        </div>
        <Link href="/dashboard/workflows/create">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Workflow
            </Button>
        </Link>
      </div>
    </header>
  );
}

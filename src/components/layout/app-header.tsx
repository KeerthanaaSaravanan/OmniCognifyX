"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDemoMode } from "@/context/demo-mode-context";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Video, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export default function AppHeader() {
  const { isDemoMode, setIsDemoMode } = useDemoMode();
  const { theme, setTheme } = useTheme();

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
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
        <div className="flex items-center space-x-2">
            <Switch id="demo-mode" checked={isDemoMode} onCheckedChange={handleDemoModeChange} />
            <Label htmlFor="demo-mode" className="flex items-center gap-2 cursor-pointer">
                <Video className="h-5 w-5 text-purple-500"/>
                <span className="font-medium text-sm">Demo Mode</span>
            </Label>
        </div>
      </div>
    </header>
  );
}

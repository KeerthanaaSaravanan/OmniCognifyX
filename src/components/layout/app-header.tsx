"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      <div className="flex-1">
        {/* Placeholder for breadcrumbs or page title */}
      </div>
      <div className="flex items-center gap-4">
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

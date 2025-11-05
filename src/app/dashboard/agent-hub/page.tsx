import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import AgentHubDashboard from "@/components/agent-hub/agent-hub-dashboard";

export default function AgentHubPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Agent Hub</h1>
          <p className="text-muted-foreground">
            Manage your autonomous SEO and marketing agents.
          </p>
        </div>
        <Link href="/dashboard/agent-hub/create">
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Agent
            </Button>
        </Link>
      </div>
      
      <AgentHubDashboard />
    </div>
  );
}

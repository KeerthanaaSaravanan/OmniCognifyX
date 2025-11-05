
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Search, FilePen, Target, TrendingUp, Bot } from "lucide-react";

const agents = [
  {
    name: "Market Intelligence Agent",
    description: "Scans market trends and competitor activity.",
    icon: Search,
    status: "Active",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "SEO Content Agent",
    description: "Generates and optimizes content for target keywords.",
    icon: FilePen,
    status: "Active",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    name: "Rank Tracking Agent",
    description: "Monitors search engine rankings for key terms.",
    icon: Target,
    status: "Active",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    name: "Technical SEO Auditor",
    description: "Audits site health and identifies technical issues.",
    icon: Bot,
    status: "Idle",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

export default function AgentHubDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,450</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keyword Rankings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+234</div>
            <p className="text-xs text-muted-foreground">Top 10 positions gained</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Content Published</CardTitle>
            <FilePen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">This month by AI agents</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 / 4</div>
            <p className="text-xs text-muted-foreground">Agents currently running</p>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Autonomous Agent Status</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {agents.map(agent => (
                <Card key={agent.name} className={`shadow-sm hover:shadow-lg transition-shadow border ${agent.bgColor.replace('bg-','border-')}`}>
                    <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                        <div className={`p-3 rounded-md ${agent.bgColor}`}>
                            <agent.icon className={`h-6 w-6 ${agent.color}`} />
                        </div>
                        <div>
                            <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
                            <CardDescription>{agent.description}</CardDescription>
                        </div>
                    </CardHeader>
                     <CardContent className="flex items-center justify-end">
                        <div className="flex items-center gap-2">
                            <span className={`h-2 w-2 rounded-full ${agent.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
                            <span className="text-sm font-medium">{agent.status}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}

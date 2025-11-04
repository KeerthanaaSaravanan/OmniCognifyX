
import { dataSources } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AgentModules() {
  const agentModuleStyles: { [key: string]: string } = {
    "DataSense Agent": "bg-blue-500/10 border-blue-500/20",
    "TaskFlow Agent": "bg-purple-500/10 border-purple-500/20",
    "InsightSynth Agent": "bg-indigo-500/10 border-indigo-500/20",
    "GovernGuard Agent": "bg-green-500/10 border-green-500/20",
  };

  const badgeStyles: { [key: string]: string } = {
    "watsonx.data": "bg-blue-500/20 text-blue-400",
    "watsonx.orchestrate": "bg-purple-500/20 text-purple-400",
    "watsonx.ai": "bg-indigo-500/20 text-indigo-400",
    "watsonx.governance": "bg-green-500/20 text-green-400",
  }

  const getBadgeSubtext = (name: string) => {
    switch (name) {
      case "DataSense Agent":
        return "watsonx.data";
      case "TaskFlow Agent":
        return "watsonx.orchestrate";
      case "InsightSynth Agent":
        return "watsonx.ai";
      case "GovernGuard Agent":
        return "watsonx.governance";
      default:
        return "";
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {dataSources.map((source) => (
        <Card key={source.id} className={`shadow-sm hover:shadow-lg transition-shadow border ${agentModuleStyles[source.name]}`}>
          <CardHeader className="flex flex-row items-start gap-4 space-y-0">
             <div className={`p-3 rounded-md ${badgeStyles[getBadgeSubtext(source.name)]?.replace('text-','bg-').replace(/dark:bg-.*-900/,'dark:bg-opacity-20')}`}>
                <source.icon className={`h-6 w-6 ${badgeStyles[getBadgeSubtext(source.name)]?.match(/text-\w+-\d+/)?.[0]}`} />
            </div>
            <div>
                <CardTitle className="text-lg font-bold">{source.name}</CardTitle>
                <CardDescription className="text-sm">{source.type}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
             <Badge variant="outline" className={`${badgeStyles[getBadgeSubtext(source.name)]} border-none`}>
                {getBadgeSubtext(source.name)}
             </Badge>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

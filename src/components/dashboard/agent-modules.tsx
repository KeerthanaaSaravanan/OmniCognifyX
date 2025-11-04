import { dataSources } from "@/lib/data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function AgentModules() {
  const agentModuleStyles: { [key: string]: string } = {
    "DataSense Agent": "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-900",
    "TaskFlow Agent": "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-900",
    "InsightSynth Agent": "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-900",
    "GovernGuard Agent": "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-900",
  };

  const badgeStyles: { [key: string]: string } = {
    "watsonx.data": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    "watsonx.orchestrate": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    "watsonx.ai": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
    "watsonx.governance": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
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
        <Card key={source.id} className={`shadow-sm hover:shadow-lg transition-shadow ${agentModuleStyles[source.name]}`}>
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

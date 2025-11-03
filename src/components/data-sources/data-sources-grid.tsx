import { dataSources } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DataSourcesGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {dataSources.map((source) => (
        <Card key={source.id}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium">{source.name}</CardTitle>
            <source.icon className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-4">{source.type}</div>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${source.status === 'Connected' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    <span className="text-sm">{source.status}</span>
                </div>
                <Button variant={source.status === 'Connected' ? 'destructive' : 'default'} size="sm">
                    {source.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

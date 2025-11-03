import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UsersTable from "@/components/settings/users-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and workspace settings.
        </p>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="users">Users & Roles</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
            <Card>
                <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>This is a placeholder for profile settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Profile management form would go here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="users">
            <UsersTable />
        </TabsContent>
        <TabsContent value="billing">
            <Card>
                <CardHeader>
                    <CardTitle>Billing</CardTitle>
                    <CardDescription>This is a placeholder for billing information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Billing details and plan management would go here.</p>
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="api">
            <Card>
                <CardHeader>
                    <CardTitle>API Keys</CardTitle>
                    <CardDescription>This is a placeholder for API key management.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>API key generation and management would go here.</p>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

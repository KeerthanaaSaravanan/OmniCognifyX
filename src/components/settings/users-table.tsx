"use client";

import { users } from "@/lib/data";
import type { User, UserRole } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function UsersTable() {
    const [userList, setUserList] = useState<User[]>(users);

    const handleRoleChange = (userId: string, newRole: UserRole) => {
        setUserList(userList.map(user => user.id === userId ? { ...user, role: newRole } : user));
        const user = userList.find(u => u.id === userId);
        toast({
            title: "Role Updated (Simulated)",
            description: `${user?.name}'s role has been changed to ${newRole}.`,
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Users & Roles</CardTitle>
                <CardDescription>Manage team members and their access levels.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>User</TableHead>
                            <TableHead>Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {userList.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="person face"/>
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium">{user.name}</p>
                                            <p className="text-sm text-muted-foreground">{user.email}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Select 
                                        defaultValue={user.role} 
                                        onValueChange={(newRole: UserRole) => handleRoleChange(user.id, newRole)}
                                    >
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Admin">Admin</SelectItem>
                                            <SelectItem value="Editor">Editor</SelectItem>
                                            <SelectItem value="Viewer">Viewer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

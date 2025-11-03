"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { BrainCircuit } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { navItems, helpNavItems } from "@/lib/data";
import { users } from "@/lib/data";

export default function AppSidebar() {
  const pathname = usePathname();
  const currentUser = users[0];

  return (
    <Sidebar variant="sidebar" side="left" collapsible="icon" className="backdrop-blur-lg">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <span className="font-semibold text-lg font-headline group-data-[collapsible=icon]:hidden">OmniMind</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname.startsWith(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            {helpNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                >
                    <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
        <SidebarSeparator />
        <div className="flex items-center gap-3 p-2 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
            <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-sm">{currentUser.name}</span>
            <span className="text-xs text-muted-foreground">{currentUser.email}</span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

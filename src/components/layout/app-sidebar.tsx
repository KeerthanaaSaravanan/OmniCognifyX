"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { navItems, agentNavItems, optimizationNavItems } from "@/lib/data";

const SidebarSectionLabel = ({ label }: { label: string }) => (
  <div className="px-3 py-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider group-data-[collapsible=icon]:hidden">
    {label}
  </div>
);

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar variant="sidebar" side="left" collapsible="icon" className="border-r-0 bg-sidebar">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 24.3L14.3 22L9.99999 17.7C9.89999 17.6 9.99999 17.4 10.2 17.4H24V14.6H10.2C9.99999 14.6 9.89999 14.8 9.99999 14.9L14.3 10L12 7.70001L6.00001 13.7C5.70001 14 5.50001 14.4 5.50001 14.9C5.50001 15.1 5.60001 15.4 5.70001 15.6L6.00001 16L12 22V24.3Z" fill="#0F62FE"/>
              <path d="M26.5 16.1V13.2H18C17.9 13.2 17.7 13.1 17.7 12.9L22.1 8.5L20 6.40002L13.9 12.5C13.6 12.8 13.5 13.2 13.5 13.6C13.5 13.8 13.5 14.1 13.7 14.4L13.9 14.7L20 20.7L22.1 18.6L17.7 14.2C17.7 14 17.9 13.9 18 13.9H26.5V16.1Z" fill="#0F62FE"/>
            </svg>
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-lg text-white">OmniMind</span>
            <span className="text-xs text-sidebar-foreground/80">watsonx Orchestrator</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
                className="bg-transparent hover:bg-sidebar-border/50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold"
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <SidebarSectionLabel label="AI Agents" />
        <SidebarMenu>
          {agentNavItems.map((item) => (
             <SidebarMenuItem key={item.href}>
             <SidebarMenuButton
               asChild
               isActive={pathname.startsWith(item.href)}
               tooltip={item.label}
               className="bg-transparent hover:bg-sidebar-border/50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold"
             >
               <Link href={item.href}>
                 <item.icon />
                 <div className="flex flex-col h-auto justify-center group-data-[collapsible=icon]:hidden">
                    <span>{item.label}</span>
                    <span className="text-xs text-sidebar-foreground/60">{item.subLabel}</span>
                 </div>
               </Link>
             </SidebarMenuButton>
           </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarSectionLabel label="Optimization" />
        <SidebarMenu>
          {optimizationNavItems.map((item) => (
            <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname.startsWith(item.href)}
              tooltip={item.label}
              className="bg-transparent hover:bg-sidebar-border/50 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground data-[active=true]:font-semibold"
            >
              <Link href={item.href}>
                <item.icon />
                <div className="flex flex-col h-auto justify-center group-data-[collapsible=icon]:hidden">
                   <span>{item.label}</span>
                   <span className="text-xs text-sidebar-foreground/60">{item.subLabel}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          ))}
        </SidebarMenu>

      </SidebarContent>
      <SidebarFooter className="p-4 group-data-[collapsible=icon]:p-2">
        <div className="bg-sidebar-border/30 p-4 rounded-lg group-data-[collapsible=icon]:hidden text-center">
            <p className="text-sm text-sidebar-foreground">Powered by</p>
            <p className="font-bold text-white">IBM watsonx Orchestrate</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

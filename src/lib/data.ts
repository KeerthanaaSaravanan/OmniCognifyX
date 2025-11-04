import {
  FileText,
  Database,
  type LucideIcon,
  LayoutDashboard,
  GitFork,
  Zap,
  Bot,
  Shield,
  Lightbulb,
} from 'lucide-react';
import { PlaceHolderImages } from './placeholder-images';

export type WorkflowStatus = 'Completed' | 'Running' | 'Failed' | 'Idle';
export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface Workflow {
  id: string;
  name: string;
  status: WorkflowStatus;
  lastRun: string;
  tasks: number;
  duration: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
}

export interface DataSource {
  id: string;
  name: string;
  type: string;
  icon: LucideIcon;
  status: 'Connected' | 'Disconnected';
}

export interface AvailableTask {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
}

export const workflows: Workflow[] = [
  { id: 'wf-001', name: 'Customer Feedback Analysis', status: 'Completed', lastRun: '2 hours ago', tasks: 3, duration: '5m 12s' },
  { id: 'wf-002', name: 'Q2 Sales Report Generation', status: 'Running', lastRun: '5 minutes ago', tasks: 5, duration: '1m 30s' },
  { id: 'wf-003', name: 'Social Media Monitoring', status: 'Failed', lastRun: '1 day ago', tasks: 4, duration: '2m 5s' },
  { id: 'wf-004', name: 'New User Onboarding', status: 'Idle', lastRun: '3 days ago', tasks: 6, duration: '8m 45s' },
  { id: 'wf-005', name: 'Inventory Stock Alert', status: 'Completed', lastRun: '4 hours ago', tasks: 2, duration: '30s' },
  { id: 'wf-006', name: 'Lead Nurturing Sequence', status: 'Idle', lastRun: '5 days ago', tasks: 8, duration: '12m 15s' },
  { id: 'wf-007', name: 'Data Backup and Archiving', status: 'Completed', lastRun: '6 hours ago', tasks: 2, duration: '1m 55s' },
];

export const users: User[] = [
  { id: 'user-001', name: 'Alice Johnson', email: 'alice@omnimind.ai', role: 'Admin', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-1')?.imageUrl ?? '' },
  { id: 'user-002', name: 'Bob Williams', email: 'bob@omnimind.ai', role: 'Editor', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-2')?.imageUrl ?? '' },
  { id: 'user-003', name: 'Charlie Brown', email: 'charlie@omnimind.ai', role: 'Viewer', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-3')?.imageUrl ?? '' },
  { id: 'user-004', name: 'Diana Prince', email: 'diana@omnimind.ai', role: 'Editor', avatarUrl: PlaceHolderImages.find(img => img.id === 'user-avatar-4')?.imageUrl ?? '' },
];

export const dataSources: DataSource[] = [
    { id: 'ds-001', name: 'DataSense Agent', type: 'Ingest and analyze raw data with watsonx.data', icon: Database, status: 'Connected' },
    { id: 'ds-002', name: 'TaskFlow Agent', type: 'Automate repetitive tasks via watsonx.orchestrate', icon: Zap, status: 'Connected' },
    { id: 'ds-003', name: 'InsightSynth Agent', type: 'Generate insights and summaries with watsonx.ai', icon: Bot, status: 'Connected' },
    { id: 'ds-004', name: 'GovernGuard Agent', type: 'Check data integrity via watsonx.governance', icon: Shield, status: 'Connected' },
];

export const availableTasks: AvailableTask[] = [
  { id: 'task-01', name: 'DataSense Agent', description: 'Ingest and analyze raw data with watsonx.data', icon: Database },
  { id: 'task-02', name: 'TaskFlow Agent', description: 'Automate repetitive tasks via watsonx.orchestrate.', icon: Zap },
  { id: 'task-03', name: 'InsightSynth Agent', description: 'Generate insights and summaries with watsonx.ai', icon: Bot },
  { id: 'task-04', name: 'GovernGuard Agent', description: 'Check data integrity via watsonx.governance', icon: Shield },
];


export const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
];

export const agentNavItems = [
    { href: "/dashboard/data-sources", icon: Database, label: "DataSense", subLabel: "watsonx.data" },
    { href: "/dashboard/workflows", icon: Zap, label: "TaskFlow", subLabel: "watsonx.orchestrate" },
    { href: "/dashboard/orchestration", icon: Bot, label: "InsightSynth", subLabel: "watsonx.ai" },
    { href: "/dashboard/settings", icon: Shield, label: "GovernGuard", subLabel: "watsonx.governance" },
];

export const optimizationNavItems = [
    { href: "/dashboard/col", icon: Lightbulb, label: "Cognitive Loop", subLabel: "Self-optimizing AI" },
]

export const helpNavItems = []

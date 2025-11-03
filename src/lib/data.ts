import {
  Cloud,
  FileText,
  Database,
  CreditCard,
  ArrowDownToLine,
  Smile,
  Bot,
  AlignJustify,
  Mail,
  type LucideIcon,
  LayoutDashboard,
  GitFork,
  Settings,
  CircleHelp,
  Zap,
  PlayCircle,
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
  { id: 'ds-001', name: 'Salesforce CRM', type: 'API', icon: Cloud, status: 'Connected' },
  { id: 'ds-002', name: 'Customer Feedback CSV', type: 'File', icon: FileText, status: 'Disconnected' },
  { id: 'ds-003', name: 'Product Inventory DB', type: 'Database', icon: Database, status: 'Connected' },
  { id: 'ds-004', name: 'Stripe Payments', type: 'API', icon: CreditCard, status: 'Connected' },
];

export const availableTasks: AvailableTask[] = [
  { id: 'task-01', name: 'Load Data from API', description: 'Ingest data from a REST API.', icon: ArrowDownToLine },
  { id: 'task-02', name: 'Load CSV File', description: 'Load data from a CSV file.', icon: FileText },
  { id: 'task-03', name: 'Sentiment Analysis', description: 'Analyze the sentiment of text data.', icon: Smile },
  { id: 'task-04', name: 'Generate Content', description: 'Generate text content using AI.', icon: Bot },
  { id: 'task-05', name: 'Summarize Text', description: 'Create a summary of long text.', icon: AlignJustify },
  { id: 'task-06', name: 'Send Email Notification', description: 'Send an email to specified recipients.', icon: Mail },
  { id: 'task-07', name: 'Save to Database', description: 'Save results to a database.', icon: Database },
];


export const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/workflows", icon: GitFork, label: "Workflows" },
    { href: "/dashboard/data-sources", icon: Database, label: "Data Sources" },
    { href: "/dashboard/orchestration", icon: PlayCircle, label: "Orchestration" },
    { href: "/dashboard/col", icon: Zap, label: "Cognitive Loop" },
    { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export const helpNavItems = [
    { href: "#", icon: CircleHelp, label: "Help & Support" },
]

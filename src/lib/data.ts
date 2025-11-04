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
  Home,
  GitBranch,
  Repeat,
  GitMerge,
  Puzzle,
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
  name:string;
  type: string;
  icon: LucideIcon;
  status: 'Connected' | 'Disconnected';
}

export interface AvailableTask {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  type: 'agent' | 'logic';
}

export interface DataSession {
  id: string;
  source: string;
  records: number;
  integrityScore: number;
  analyzedAt: string;
  status: 'Analyzed' | 'Failed';
}

export interface GovernanceReport {
    id: string;
    scanType: string;
    confidenceScore: number;
    issuesFound: number;
    scannedAt: string;
    status: 'Compliant' | 'At Risk';
}


export const workflows: Workflow[] = [
  { id: 'wf-001', name: 'Customer Feedback Analysis', status: 'Completed', lastRun: '2 hours ago', tasks: 3, duration: '5m 12s' },
  { id: 'wf-002', name: 'Q2 Sales Report Generation', status: 'Running', lastRun: '5 minutes ago', tasks: 5, duration: '1m 30s' },
  { id: 'wf-003', name: 'Social Media Monitoring', status: 'Failed', lastRun: '1 day ago', tasks: 4, duration: '2m 5s' },
  { id: 'wf-004', name: 'New User Onboarding', status: 'Idle', lastRun: '3 days ago', tasks: 6, duration: '8m 45s' },
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
  { id: 'task-01', name: 'DataSense Agent', description: 'Ingest and analyze raw data with watsonx.data', icon: Database, type: 'agent' },
  { id: 'task-02', name: 'TaskFlow Agent', description: 'Automate repetitive tasks via watsonx.orchestrate.', icon: Zap, type: 'agent' },
  { id: 'task-03', name: 'InsightSynth Agent', description: 'Generate insights and summaries with watsonx.ai', icon: Bot, type: 'agent' },
  { id: 'task-04', name: 'GovernGuard Agent', description: 'Check data integrity via watsonx.governance', icon: Shield, type: 'agent' },
  { id: 'logic-01', name: 'Decision Node', description: 'Branch workflow based on a condition', icon: GitBranch, type: 'logic' },
  { id: 'logic-02', name: 'Loop Node', description: 'Repeat a sequence of tasks', icon: Repeat, type: 'logic' },
  { id: 'logic-03', name: 'Merge Node', description: 'Combine multiple workflow paths', icon: GitMerge, type: 'logic' },
  { id: 'logic-04', name: 'Trigger Node', description: 'Start workflow based on an event', icon: Puzzle, type: 'logic' },
];

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  nodes: string[]; // List of availableTask IDs
}

export const workflowTemplates: WorkflowTemplate[] = [
    {
        id: 'template-01',
        name: 'Data Audit Flow',
        description: 'An essential workflow for ensuring data quality and compliance from ingestion to validation.',
        nodes: ['task-01', 'task-04']
    },
    {
        id: 'template-02',
        name: 'Insight Generation',
        description: 'A standard pipeline to process data and extract actionable AI-driven insights.',
        nodes: ['task-01', 'task-03']
    },
    {
        id: 'template-03',
        name: 'Full Compliance Review',
        description: 'A comprehensive flow that ingests, processes, and validates data against governance rules.',
        nodes: ['task-01', 'task-02', 'task-04']
    },
    {
        id: 'template-04',
        name: 'Cognitive Feedback Loop',
        description: 'An advanced, self-optimizing loop where insights are generated and then validated for continuous improvement.',
        nodes: ['task-02', 'task-03', 'task-04']
    }
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

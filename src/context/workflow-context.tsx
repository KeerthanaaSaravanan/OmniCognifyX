
"use client";

import { createContext, useState, ReactNode } from 'react';
import { workflows as initialWorkflows, Workflow } from '@/lib/data';

type WorkflowContextType = {
  workflows: Workflow[];
  addWorkflow: (workflow: Workflow) => void;
};

export const WorkflowContext = createContext<WorkflowContextType>({
  workflows: initialWorkflows,
  addWorkflow: () => {},
});

export function WorkflowProvider({ children }: { children: ReactNode }) {
  const [workflows, setWorkflows] = useState<Workflow[]>(initialWorkflows);

  const addWorkflow = (workflow: Workflow) => {
    setWorkflows(prevWorkflows => [workflow, ...prevWorkflows]);
  };

  const value = { workflows, addWorkflow };

  return (
    <WorkflowContext.Provider value={value}>
      {children}
    </WorkflowContext.Provider>
  );
}

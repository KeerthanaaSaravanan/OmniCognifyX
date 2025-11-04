
"use client";

import { createContext, useState, ReactNode } from 'react';
import type { GovernanceReport } from '@/lib/data';

type GovernanceContextType = {
  governanceReports: GovernanceReport[];
  addGovernanceReport: (report: GovernanceReport) => void;
};

export const GovernanceContext = createContext<GovernanceContextType>({
  governanceReports: [],
  addGovernanceReport: () => {},
});

export function GovernanceProvider({ children }: { children: ReactNode }) {
  const [governanceReports, setGovernanceReports] = useState<GovernanceReport[]>([]);

  const addGovernanceReport = (report: GovernanceReport) => {
    setGovernanceReports(prevReports => [report, ...prevReports]);
  };

  const value = { governanceReports, addGovernanceReport };

  return (
    <GovernanceContext.Provider value={value}>
      {children}
    </GovernanceContext.Provider>
  );
}

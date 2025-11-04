
"use client";

import { createContext, useState, ReactNode } from 'react';
import type { DataSession } from '@/lib/data';

type DataSessionContextType = {
  dataSessions: DataSession[];
  addDataSession: (session: DataSession) => void;
};

export const DataSessionContext = createContext<DataSessionContextType>({
  dataSessions: [],
  addDataSession: () => {},
});

export function DataSessionProvider({ children }: { children: ReactNode }) {
  const [dataSessions, setDataSessions] = useState<DataSession[]>([]);

  const addDataSession = (session: DataSession) => {
    setDataSessions(prevSessions => [session, ...prevSessions]);
  };

  const value = { dataSessions, addDataSession };

  return (
    <DataSessionContext.Provider value={value}>
      {children}
    </DataSessionContext.Provider>
  );
}

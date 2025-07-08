import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { HistoryContext } from './HistoryContext';
import { HistoryEntryType } from '../types/HistoryEntryType';
import { HistoryContextType } from '../types/HistoryContextType';
import { MaxHistoryLength } from '../constants';

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState<HistoryEntryType[]>(() => {
    try {
      const localData = localStorage.getItem('requestHistory');
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('requestHistory', JSON.stringify(history));
  }, [history]);

  const addHistoryEntry = useCallback((entry: Omit<HistoryEntryType, 'id' | 'timestamp'>) => {
    const newEntry: HistoryEntryType = {
      ...entry,
      id: `hist-${Date.now()}`,
      timestamp: Date.now(),
    };

    setHistory((prevHistory) => {
      const historyWithoutDuplicate = prevHistory.filter(
        (oldEntry) =>
          !(
            oldEntry.method === newEntry.method &&
            oldEntry.microservice === newEntry.microservice &&
            oldEntry.endpoint === newEntry.endpoint &&
            oldEntry.payloadText === newEntry.payloadText
          )
      );
      const updatedHistory = [newEntry, ...historyWithoutDuplicate];
      return updatedHistory.slice(0, MaxHistoryLength);
    });
  }, []);

  const removeHistoryEntry = useCallback((id: string) => {
    setHistory((prevHistory) => prevHistory.filter((entry) => entry.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  const value: HistoryContextType = useMemo(
    () => ({
      history,
      addHistoryEntry,
      removeHistoryEntry,
      clearHistory,
    }),
    [history, addHistoryEntry, removeHistoryEntry, clearHistory]
  );

  return <HistoryContext.Provider value={value}>{children}</HistoryContext.Provider>;
};

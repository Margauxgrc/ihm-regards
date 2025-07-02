import { useContext } from 'react';
import { HistoryContext } from '../contexts/HistoryContext';
import type { HistoryContextType } from '../types/HistoryContextType';

export const useHistory = (): HistoryContextType => {
  return useContext(HistoryContext) as HistoryContextType;
};

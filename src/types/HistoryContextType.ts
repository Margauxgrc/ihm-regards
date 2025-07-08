import { HistoryEntryType } from './HistoryEntryType';

export interface HistoryContextType {
  history: HistoryEntryType[];
  addHistoryEntry: (entry: Omit<HistoryEntryType, 'id' | 'timestamp'>) => void;
  removeHistoryEntry: (id: string) => void;
  clearHistory: () => void;
}

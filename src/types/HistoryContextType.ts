import { HistoryEntryType } from './HistoryEntryType';

export interface HistoryContextType {
  history: HistoryEntryType[];
  selectedEntry: HistoryEntryType | null;
  setSelectedEntry: (entry: HistoryEntryType | null) => void;
  addHistoryEntry: (entry: Omit<HistoryEntryType, 'id' | 'timestamp'>) => void;
  removeHistoryEntry: (id: string) => void;
  clearHistory: () => void;
}

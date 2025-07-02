import { createContext } from 'react';
import type { HistoryContextType } from '../types/HistoryContextType';

export const HistoryContext = createContext<HistoryContextType | null>(null);

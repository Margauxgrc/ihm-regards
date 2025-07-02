import { createContext } from 'react';
import type { RespContextType } from '../types/RespContextType';

export const RespContext = createContext<RespContextType | null>(null);

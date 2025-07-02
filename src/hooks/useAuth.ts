import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import type { AuthContextType } from '../types/AuthContextType';

export const useAuth = (): AuthContextType => {
  return useContext(AuthContext) as AuthContextType;
};

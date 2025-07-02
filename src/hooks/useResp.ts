import { useContext } from 'react';
import { RespContext } from '../contexts/RespContext';
import type { RespContextType } from '../types/RespContextType';

export const useResp = (): RespContextType => {
  return useContext(RespContext) as RespContextType;
};

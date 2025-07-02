import React, { useState } from 'react';
import { RespContext } from './RespContext';

export const RespProvider = ({ children }: { children: React.ReactNode }) => {
  const [response, setResponse] = useState<string | null>(null);

  return <RespContext.Provider value={{ response, setResponse }}>{children}</RespContext.Provider>;
};

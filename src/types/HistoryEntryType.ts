import { Method } from 'axios';

export interface HistoryEntryType {
  id: string;
  method: Method;
  microservice: string;
  endpoint: string;
  payloadText: string;
  timestamp: number;
}

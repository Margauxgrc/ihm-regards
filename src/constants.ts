import { Method } from 'axios';

export const MaxHistoryLength = 3 as const;

export const HTTP_METHODS: readonly Method[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

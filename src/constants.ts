import { Method } from 'axios';

export const MaxHistoryLength = 3 as const;

export const HTTP_METHODS: readonly Method[] = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'] as const;

export const HTTP_HOST = 'http://10.31.37.15' as const;

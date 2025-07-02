import React from 'react';
import { List, Typography } from '@mui/material';
import { HistoryEntryType } from '../types/HistoryEntryType';
import HistoryListItem from './HistoryListItem';

interface HistoryListProps {
  history: HistoryEntryType[];
  onSelectEntry: (entry: HistoryEntryType) => void;
  onDeleteEntry: (id: string) => void;
}

export default function HistoryList({ history, onSelectEntry, onDeleteEntry }: HistoryListProps) {
  if (history.length === 0) {
    return <Typography variant="body1">Aucune requête dans l'historique.</Typography>;
  }

  return (
    <List>
      {history.map((entry) => (
        <HistoryListItem key={entry.id} entry={entry} onSelect={onSelectEntry} onDelete={onDeleteEntry} />
      ))}
    </List>
  );
}

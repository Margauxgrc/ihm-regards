import { List, Typography } from '@mui/material';
import { HistoryEntryType } from '../types/HistoryEntryType';
import HistoryListItem from './HistoryListItem';

interface HistoryListProps {
  history: HistoryEntryType[];
  onCloseDrawer: () => void;
}

export default function HistoryList({ history, onCloseDrawer }: HistoryListProps) {
  if (history.length === 0) {
    return <Typography variant="body1">Aucune requête dans l'historique.</Typography>;
  }

  return (
    <List>
      {history.map((entry) => (
        <HistoryListItem key={entry.id} entry={entry} onCloseDrawer={onCloseDrawer} />
      ))}
    </List>
  );
}

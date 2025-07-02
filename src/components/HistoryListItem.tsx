import React from 'react';
import { Box, Typography, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { HistoryEntryType } from '../types/HistoryEntryType';

interface HistoryListItemProps {
  entry: HistoryEntryType;
  onSelect: (entry: HistoryEntryType) => void;
  onDelete: (id: string) => void;
}

export default function HistoryListItem({ entry, onSelect, onDelete }: HistoryListItemProps) {
  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Box sx={{ display: 'flex' }}>
          <IconButton title="Recharger cette requête" onClick={() => onSelect(entry)}>
            <ReplayIcon />
          </IconButton>
          <IconButton title="Supprimer" onClick={() => onDelete(entry.id)}>
            <DeleteIcon />
          </IconButton>
        </Box>
      }
    >
      <Box sx={{ pb: 2, pr: 12 }}>
        <ListItemText
          primary={
            <React.Fragment>
              <Typography component="span" variant="body1" sx={{ display: 'block' }}>
                {`${entry.method} /${entry.microservice}/${entry.endpoint}`}
              </Typography>
              {entry.payloadText && entry.payloadText !== '{}' && (
                <Typography component="span" variant="body2">
                  {entry.payloadText}
                </Typography>
              )}
            </React.Fragment>
          }
          secondary={new Date(entry.timestamp).toLocaleString()}
        />
      </Box>
    </ListItem>
  );
}

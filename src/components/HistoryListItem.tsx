import React from 'react';
import { Box, Typography, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import { HistoryEntryType } from '../types/HistoryEntryType';
import { useNavigate, useParams } from 'react-router-dom';
import { useHistory } from '../hooks/useHistory';

interface HistoryListItemProps {
  entry: HistoryEntryType;
  onCloseDrawer: () => void;
}

export default function HistoryListItem({ entry, onCloseDrawer }: HistoryListItemProps) {
  const { host } = useParams<{ host: string }>();
  const navigate = useNavigate();
  const { removeHistoryEntry } = useHistory();

  const handleSelect = () => {
    navigate(`/${host}/home`, { state: { entryToLoad: entry } });
    onCloseDrawer();
  };

  const handleDelete = () => {
    removeHistoryEntry(entry.id);
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <Box sx={{ display: 'flex' }}>
          <IconButton title="Recharger cette requête" onClick={handleSelect}>
            <ReplayIcon />
          </IconButton>
          <IconButton title="Supprimer" onClick={handleDelete}>
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

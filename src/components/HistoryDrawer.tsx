import React from 'react';
import { Drawer, Box, Typography, IconButton, Button, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useHistory } from '../hooks/useHistory';
import HistoryList from './HistoryList';

interface HistoryDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function HistoryDrawer({ open, onClose }: HistoryDrawerProps) {
  const { history, clearHistory } = useHistory();

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6">Historique des requêtes</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {history.length > 0 ? (
          <Button variant="outlined" onClick={clearHistory} color="warning">
            Vider l'historique
          </Button>
        ) : (
          <Divider />
        )}
        <HistoryList history={history} onCloseDrawer={onClose} />
      </Box>
    </Drawer>
  );
}

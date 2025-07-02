import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { HistoryEntryType } from '../types/HistoryEntryType';
import HistoryDrawer from './HistoryDrawer';

interface NavBarProps {
  children: React.ReactNode;
  onSelectHistory?: (history: HistoryEntryType) => void;
}

export default function NavBar({ children }: NavBarProps) {
  const { logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">Interface de communication avec REGARDS</Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Button color="inherit" onClick={() => setDrawerOpen(true)}>
              Historique
            </Button>
            <Button color="inherit" onClick={logout}>
              Déconnexion
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        {children}
      </Box>

      <HistoryDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Box>
  );
}

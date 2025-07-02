import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Router from './AppRouter';
import { RespProvider } from './contexts/RespProvider';
import { HistoryProvider } from './contexts/HistoryProvider';
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <RespProvider>
          <HistoryProvider>
            <BrowserRouter>
              <div className="App">
                <Router />
              </div>
            </BrowserRouter>
          </HistoryProvider>
        </RespProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

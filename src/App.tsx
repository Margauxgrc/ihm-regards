import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import Router from './AppRouter';
import { RespProvider } from './contexts/RespProvider';
import { HistoryProvider } from './contexts/HistoryProvider';
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
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
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

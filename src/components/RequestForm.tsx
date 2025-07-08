import CustomTextField from './CustomTextField';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { HTTP_METHODS } from '../constants';
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
} from '@mui/material';
import { Method } from 'axios';

interface RequestFormProps {
  method: Method;
  microservice: string;
  endpoint: string;
  payloadText: string;
  isLoading: boolean;
  error: string | null;
  onMethodChange: (value: Method) => void;
  onMicroserviceChange: (value: string) => void;
  onEndpointChange: (value: string) => void;
  onPayloadChange: (value: string) => void;
  onSubmit: () => void;
}

export default function RequestForm({
  method,
  microservice,
  endpoint,
  payloadText,
  isLoading,
  error,
  onMethodChange,
  onMicroserviceChange,
  onEndpointChange,
  onPayloadChange,
  onSubmit,
}: RequestFormProps) {
  return (
    <Paper>
      <Typography variant="h6">Envoyer une requête à REGARDS</Typography>

      {error && (
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      )}

      <Grid container spacing={2}>
        <Grid item sm={2}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="method-select-label">Méthode</InputLabel>
            <Select
              labelId="method-select-label"
              value={method}
              label="Méthode"
              onChange={(e) => onMethodChange(e.target.value as Method)}
            >
              {HTTP_METHODS.map((methodName) => (
                <MenuItem key={methodName} value={methodName}>
                  {methodName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item sm={10}>
          <CustomTextField label="Microservice" value={microservice} onChange={onMicroserviceChange} />
        </Grid>
      </Grid>

      <CustomTextField label="Endpoint" value={endpoint} onChange={onEndpointChange} />

      <Box
        sx={{
          maxHeight: { sm: '40vh' },
          my: 2,
          textAlign: 'left',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {method === 'GET' ? 'Paramètres (JSON)' : 'Corps de la requête (JSON)'}
        </Typography>
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto',
            my: 1,
          }}
        >
          <CodeEditor
            value={payloadText}
            language="json"
            onChange={(e) => onPayloadChange(e.target.value)}
            placeholder="Saisir les paramètres ou le corps de la requête en JSON"
            padding={15}
            data-color-mode="dark"
            style={{
              overflow: 'auto',
              fontSize: 14,
              fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
              borderRadius: '4px',
            }}
          />
        </Box>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={onSubmit}
        disabled={!microservice || !endpoint || isLoading}
        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
      >
        {isLoading ? 'Envoi en cours...' : 'Envoyer'}
      </Button>
    </Paper>
  );
}

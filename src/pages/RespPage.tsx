import React, { useEffect } from 'react';
import { useResp } from '../hooks/useResp';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';
import NavBar from '../components/NavBar';
import ReactJson from '@microlink/react-json-view';

export default function RespPage() {
  const { host } = useParams<{ host: string }>();
  const { response, setResponse } = useResp();
  const navigate = useNavigate();

  useEffect(() => {
    if (response === null) {
      navigate(`/${host}/home`);
    }
  }, [response, navigate]);

  const handleReturn = () => {
    setResponse(null);
    navigate(`/${host}/home`);
  };

  if (response === null) {
    return null;
  }

  return (
    <NavBar>
      <Paper>
        <Typography variant="h6" gutterBottom>
          {response ? 'Réponse reçue' : 'Requête réussie, aucun contenu à afficher'}
        </Typography>

        {response && (
          <Box
            sx={{
              mb: 4,
              overflowY: 'auto',
              textAlign: 'left',
              maxHeight: { sm: '65vh' },
            }}
          >
            <ReactJson
              src={response}
              theme="google"
              collapsed={2}
              displayDataTypes={false}
              style={{ padding: '15px', fontSize: '14px' }}
            />
          </Box>
        )}

        <Button variant="contained" color="primary" onClick={handleReturn}>
          Envoyer une nouvelle requête
        </Button>
      </Paper>
    </NavBar>
  );
}

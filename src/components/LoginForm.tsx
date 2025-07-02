import React from 'react';
import CustomTextField from './CustomTextField';
import { Box, Paper, Typography, Button } from '@mui/material';

interface LoginFormProps {
  username: string;
  password: string;
  project: string;
  error: string;
  onChangeUsername: (val: string) => void;
  onChangePassword: (val: string) => void;
  onChangeProject: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function LoginForm({
  username,
  password,
  project,
  error,
  onChangeUsername,
  onChangePassword,
  onChangeProject,
  onSubmit,
}: LoginFormProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper>
        <Typography variant="h6" gutterBottom>
          Connexion à l'interface de communication avec Regards
        </Typography>
        <Typography variant="body2" gutterBottom>
          Veuillez saisir vos identifiants Regards pour vous connecter
        </Typography>

        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}

        <form onSubmit={onSubmit}>
          <CustomTextField label="Utilisateur ou e-mail" value={username} onChange={onChangeUsername} />
          <CustomTextField label="Mot de passe" type="password" value={password} onChange={onChangePassword} />
          <CustomTextField label="Projet" value={project} onChange={onChangeProject} />

          <Box mt={3}>
            <Button type="submit" variant="contained" color="primary" disabled={!username || !password || !project}>
              Connexion
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}

import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { generateToken } from '../services/AuthService';

export function useLoginForm() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [project, setProject] = useState('');
  const [error, setError] = useState('');
  const { authToken, login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) navigate('/home');
  }, [authToken, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const { token, expires_in } = await generateToken(username, password, project);
      login(token, expires_in, project);
    } catch {
      setError('Identifiants incorrects. Veuillez réessayer.');
    }
  };

  return {
    username,
    password,
    project,
    error,
    onChangeUsername: setUserName,
    onChangePassword: setPassword,
    onChangeProject: setProject,
    onSubmit: handleSubmit,
  };
}

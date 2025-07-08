import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLoginForm } from '../hooks/useLoginForm';
import { useParams } from 'react-router-dom';

export default function LoginPage() {
  const { host } = useParams<{ host: string }>();
  const loginFormLogic = useLoginForm(host);
  return <LoginForm {...loginFormLogic} />;
}

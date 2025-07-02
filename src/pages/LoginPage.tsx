import React from 'react';
import LoginForm from '../components/LoginForm';
import { useLoginForm } from '../hooks/useLoginForm';

export default function LoginPage() {
  const loginFormLogic = useLoginForm();
  return <LoginForm {...loginFormLogic} />;
}

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import RequestPage from './pages/RequestPage';
import RespPage from './pages/RespPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

const ProtectedRoute = ({ component: Component }) => {
  const { authToken } = useAuth();

  return authToken ? <Component /> : <Navigate to="/login" replace />;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<ProtectedRoute component={RequestPage} />} />
      <Route path="/response" element={<ProtectedRoute component={RespPage} />} />
      <Route path="/*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

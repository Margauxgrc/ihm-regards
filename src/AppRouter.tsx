import { Routes, Route, Navigate, useParams } from 'react-router-dom';
import RequestPage from './pages/RequestPage';
import RespPage from './pages/RespPage';
import LoginPage from './pages/LoginPage';
import { useAuth } from './hooks/useAuth';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute = ({ component: Component }: ProtectedRouteProps) => {
  const { authToken } = useAuth();
  const { host } = useParams<{ host: string }>();

  return authToken ? <Component /> : <Navigate to={`/${host}/login`} replace />;
};

const HostRedirect = () => {
  const { host } = useParams();
  return <Navigate to={`/${host}/login`} replace />;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/:host/login" element={<LoginPage />} />
      <Route path="/:host/home" element={<ProtectedRoute component={RequestPage} />} />
      <Route path="/:host/response" element={<ProtectedRoute component={RespPage} />} />
      <Route path="/:host" element={<HostRedirect />} />
    </Routes>
  );
}

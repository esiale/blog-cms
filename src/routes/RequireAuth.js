import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../common/hooks/useAuth';

const RequireAuth = () => {
  const { checkAuth } = useAuth();
  const location = useLocation();

  if (!checkAuth()) return <Navigate to="/login" state={{ from: location }} />;
  return <Outlet />;
};

export default RequireAuth;

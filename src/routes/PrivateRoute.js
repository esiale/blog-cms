import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../common/hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const { checkAuth } = useAuth();
  const location = useLocation();

  if (!checkAuth()) return <Navigate to="/login" state={{ from: location }} />;
  return children;
};

export default PrivateRoute;

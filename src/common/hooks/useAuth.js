import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
  const { signIn } = useContext(AuthContext);
  return { signIn };
};

export default useAuth;

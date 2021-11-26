import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
  const { signIn, signOut, checkAuth } = useContext(AuthContext);
  return { signIn, signOut, checkAuth };
};

export default useAuth;

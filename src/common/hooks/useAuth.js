import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';

const useAuth = () => {
  const { signIn, signOut, checkAuth, authState } = useContext(AuthContext);
  return { signIn, signOut, checkAuth, authState };
};

export default useAuth;

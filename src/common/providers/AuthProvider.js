import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
import { ax, setApiToken } from '../config/axios/axiosConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
  });

  useEffect(() => {
    setApiToken(authState.token);
  }, [authState]);

  const signIn = async (userInfo) => {
    try {
      const { data } = await ax.post('/auth/login', userInfo);
      const { user } = data;
      const { token } = data;
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      setAuthState({
        user,
        token,
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  const signOut = () => {
    setAuthState({ user: {}, token: '' });
    localStorage.clear();
  };

  const checkAuth = useCallback(() => !!authState.token, [authState.token]);

  const contextValue = useMemo(
    () => ({
      signIn,
      checkAuth,
      signOut,
      authState,
    }),
    [checkAuth, authState]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

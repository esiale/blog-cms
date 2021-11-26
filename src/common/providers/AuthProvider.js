import React, { createContext, useState, useMemo } from 'react';
import ax from '../config/axios/axiosConfig';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
  });

  const signIn = async (userInfo) => {
    try {
      const { data } = await ax.post('/auth/login', userInfo);
      const { user } = data;
      const { token } = data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);
      setAuthState({
        user,
        token,
      });
      return data;
    } catch (err) {
      throw err;
    }
  };

  const checkAuth = () => !!authState.token;

  const contextValue = useMemo(
    () => ({
      signIn,
      checkAuth,
    }),
    []
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

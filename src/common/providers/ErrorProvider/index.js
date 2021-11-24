import React, { useState, useMemo } from 'react';

const ErrorContext = React.createContext({
  error: null,
  addError: () => {},
  removeError: () => {},
});

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const removeError = () => setError(null);
  const addError = (status, message) => setError({ status, message });

  const contextValue = useMemo(
    () => ({
      error,
      addError,
      removeError,
    }),
    [error]
  );

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
export { ErrorContext };

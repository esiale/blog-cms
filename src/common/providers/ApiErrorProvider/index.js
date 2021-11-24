import React, { useState, useMemo } from 'react';

const ApiErrorContext = React.createContext({
  error: null,
  addError: () => {},
  removeError: () => {},
});

const ApiErrorProvider = ({ children }) => {
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
    <ApiErrorContext.Provider value={contextValue}>
      {children}
    </ApiErrorContext.Provider>
  );
};

export default ApiErrorProvider;
export { ApiErrorContext };

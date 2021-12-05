import React, { useState, useMemo } from 'react';

const ModalContext = React.createContext({
  message: null,
  addMessage: () => {},
  removeMessage: () => {},
});

const ModalProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const removeMessage = () => setMessage(null);
  const addMessage = (message) => setMessage(message);

  const contextValue = useMemo(
    () => ({
      message,
      addMessage,
      removeMessage,
    }),
    [message]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, ModalContext };

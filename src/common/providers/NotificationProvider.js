import React, { useState, useMemo } from 'react';

const NotificationContext = React.createContext({
  message: null,
  addMessage: () => {},
  removeMessage: () => {},
});

const NotificationProvider = ({ children }) => {
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
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };

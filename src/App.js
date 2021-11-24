import React from 'react';
import Login from '/pages/Login';
import ErrorProvider from '/common/providers/ErrorProvider';

function App() {
  return (
    <>
      <ErrorProvider>
        <Login />
      </ErrorProvider>
    </>
  );
}

export default App;

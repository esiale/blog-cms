import React from 'react';
import Login from './pages/Login';
import ApiErrorProvider from './common/providers/ApiErrorProvider';
import ApiErrorNotification from './components/ApiErrorNotification';

function App() {
  return (
    <>
      <ApiErrorProvider>
        <Login />
        <ApiErrorNotification />
      </ApiErrorProvider>
    </>
  );
}

export default App;

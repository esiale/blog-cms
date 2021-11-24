import React from 'react';
import Login from './pages/Login';
import ApiErrorProvider from './common/providers/ApiErrorProvider';
import ApiErrorNotification from './components/ApiErrorNotification';
import ApiLoader from './components/ApiLoader';

function App() {
  return (
    <>
      <ApiErrorProvider>
        <ApiLoader />
        <Login />
        <ApiErrorNotification />
      </ApiErrorProvider>
    </>
  );
}

export default App;

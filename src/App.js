import React from 'react';
import Login from './pages/Login';
import ApiErrorProvider from './common/providers/ApiErrorProvider';
import ApiErrorNotification from './components/ApiErrorNotification';
import ApiLoader from './components/ApiLoader';
import { AuthProvider } from './common/providers/AuthProvider';

function App() {
  return (
    <>
      <AuthProvider>
        <ApiErrorProvider>
          <ApiLoader />
          <Login />
          <ApiErrorNotification />
        </ApiErrorProvider>
      </AuthProvider>
    </>
  );
}

export default App;

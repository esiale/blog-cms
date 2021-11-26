import React from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ApiErrorProvider from './common/providers/ApiErrorProvider';
import ApiErrorNotification from './components/ApiErrorNotification';
import ApiLoader from './components/ApiLoader';
import PrivateRoute from './routes/PrivateRoute';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './common/providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <ApiErrorProvider>
        <ApiLoader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <ApiErrorNotification />
      </ApiErrorProvider>
    </AuthProvider>
  );
}

export default App;

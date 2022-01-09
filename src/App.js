import React from 'react';
import Login from './pages/Login';
import Notification from './components/Notification';
import ApiLoader from './components/ApiLoader';
import RequireAuth from './routes/RequireAuth';
import secureRoutes from './routes/secureRoutes';
import Layout from './pages/Layout';
import uniqid from 'uniqid';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './common/providers/AuthProvider';
import { NotificationProvider } from './common/providers/NotificationProvider';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <ApiLoader />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
              {secureRoutes.map(({ path, element }) => {
                return <Route path={path} element={element} key={uniqid()} />;
              })}
            </Route>
          </Route>
        </Routes>
        <Notification />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;

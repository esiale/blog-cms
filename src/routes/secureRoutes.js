import Posts from '../pages/Posts';
import Users from '../pages/Users';
import { Navigate } from 'react-router-dom';

const secureRoutes = [
  { path: '/', element: <Navigate replace to="/posts" /> },
  { path: '/posts/*', element: <Posts /> },
  { path: '/users/*', element: <Users /> },
];

export default secureRoutes;

import Posts from '../pages/Posts';
import Users from '../pages/Users';

const secureRoutes = [
  { path: '/posts/*', element: <Posts /> },
  { path: '/users/*', element: <Users /> },
];

export default secureRoutes;

import { Routes, Route } from 'react-router-dom';
import ViewUsers from './components/ViewUsers';
import NewUser from './components/NewUser';

const Users = () => {
  return (
    <Routes>
      <Route path="" element={<ViewUsers />} />
      <Route path="new" element={<NewUser />} />
    </Routes>
  );
};

export default Users;

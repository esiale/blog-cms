import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-full bg-gray-50 flex flex-col justify-between py-2 px-5">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

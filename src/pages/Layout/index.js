import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;

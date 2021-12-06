import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="h-full flex flex-col justify-between mx-5">
      <Header />
      <main className="h-full md:pt-16 pt-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

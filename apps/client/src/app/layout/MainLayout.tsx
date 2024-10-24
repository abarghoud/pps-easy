import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center items-center">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

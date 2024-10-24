import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="h-screen overflow-hidden flex items-center justify-center">
      <Outlet />
    </div>
  );
};

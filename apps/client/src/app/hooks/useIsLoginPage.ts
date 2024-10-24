import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export const useIsLoginPage = () => {
  const location = useLocation();
  return useMemo(() => location.pathname === '/login', [location.pathname]);
};

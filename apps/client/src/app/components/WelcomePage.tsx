import React, { useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const TIME_TO_REDIRECT = 2000;

export const WelcomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const homepageRedirectTimer = setTimeout(() => {
      navigate('/');
    }, TIME_TO_REDIRECT);

    return () => clearTimeout(homepageRedirectTimer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-4">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
        Welcome {user ? user.email : 'Guest'}!
      </h1>
      <p className="text-base sm:text-lg md:text-xl mb-8 text-center">
        We're glad to have you here.
      </p>
    </div>
  );
};

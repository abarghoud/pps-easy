import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FirebaseAuthenticationService } from '../service/firebase-authentication-service';
import { auth } from "../config/firebase";
import { useAuth } from '../hooks/useAuth';

const TIME_TO_REDIRECT = 2000;

export const WelcomePage: FC = () => {
  const authService = new FirebaseAuthenticationService(auth);

  const { user } = useAuth(authService);
  const navigate = useNavigate();

  useEffect(() => {
    const homepageRedirectTimer = setTimeout(() => {
      navigate('/');
    }, TIME_TO_REDIRECT);

    return () => clearTimeout(homepageRedirectTimer);
  }, [navigate]);

  return (
    <div className="w-full max-w-4xl mx-auto min-h-[595px] flex flex-col justify-center p-6 sm:p-8 md:p-10 lg:p-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-center text-primary">
        Welcome {user && user.displayName ? user?.displayName : user?.email}!
      </h1>
      <p className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 text-center text-primary">
        We're glad to have you here.
      </p>
    </div>
  );
};

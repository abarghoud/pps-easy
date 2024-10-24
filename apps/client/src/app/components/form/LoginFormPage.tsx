import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { Testimonial } from '../Testimonial';
import { Logo } from '../Logo';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader';
import { ResetPassword } from './ResetPassword';
import Home from '../../../assets/Home.jpg';

export const LoginFormPage = () => {
  const { loading, login, loginWithGoogle, register, user } = useAuth();
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLogin, setIsLogin] = useState(true);
  const [viewMode, setViewMode] = useState<'login' | 'reset'>('login');
  const navigate = useNavigate();

  const handleLoginSubmit = useCallback(async (data: { email: string; password: string }) => {
    try {
      await login(data.email, data.password);
      setErrors({});
    } catch {
      setErrors({ email: 'Failed to authenticate. Please try again.' });
    }
  }, [login]);

  const handleRegisterSubmit = useCallback(async (data: { email: string; password: string }) => {
    try {
      await register(data.email, data.password);
      setErrors({});
    } catch {
      setErrors({ email: 'Failed to create an account. Please try again.' });
    }
  }, [register]);

  const handleGoogleLogin = useCallback(async () => {
    try {
      await loginWithGoogle();
      setErrors({});
    } catch {
      setErrors({ email: 'Google authentication failed. Please try again.' });
    }
  }, [loginWithGoogle]);

  const getTitle = () => {
    return viewMode === 'reset' ? 'Réinitialiser le mot de passe' : (isLogin ? 'Connexion' : 'Créer un compte');
  };

  const renderForm = useCallback(() => {
    return viewMode === 'reset' ? (
      <ResetPassword />
    ) : (
      <LoginForm
        onLoginSubmit={handleLoginSubmit}
        onRegisterSubmit={handleRegisterSubmit}
        errors={errors}
        onGoogleLogin={handleGoogleLogin}
        isLogin={isLogin}
      />
    );
  }, [viewMode, handleLoginSubmit, handleRegisterSubmit, errors, handleGoogleLogin, isLogin]);

  const renderActionButtons = useCallback(() => {
    if (viewMode === 'reset') {
      return (
        <button
          onClick={() => setViewMode('login')}
          className="text-blue-300 hover:underline transition-all text-sm"
        >
          Retour à la connexion
        </button>
      );
    }

    return (
      <div className='flex flex-col items-center'>
        <button
          onClick={() => setIsLogin(prev => !prev)}
          className="text-blue-300 hover:underline transition-all text-sm mb-6"
        >
          {isLogin ? "Besoin d'un compte ? Créez-en un !" : "Vous avez déjà un compte ? Connectez-vous !"}
        </button>
        <button
          onClick={() => setViewMode('reset')}
          className="text-blue-300 hover:underline transition-all text-sm"
        >
          Mot de passe oublié ?
        </button>
      </div>
    );
  }, [isLogin, viewMode]);

  useEffect(() => {
    if (user) {
      navigate('/welcome');
    }
  }, [user, navigate]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-gray-900">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-gray-900 to-black text-white flex-col justify-between p-12">
        <Logo />
        <div className="flex-grow flex justify-center items-center p-4">
          <img
            alt="Illustration"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            loading="lazy"
            src={Home}
          />
        </div>
        <Testimonial />
      </div>

      <div className="flex-grow w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-6 lg:p-12">
        <div className="bg-gray-800 p-8 lg:p-10 rounded-lg w-full max-w-md shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-white text-3xl font-bold mb-4 text-center">
            {getTitle()}
          </h2>

          {renderForm()}

          <div className="flex justify-center mt-4">
            {renderActionButtons()}
          </div>
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect, useCallback } from 'react';
import { LoginForm } from './LoginForm';
import { Testimonial } from '../Testimonial';
import { Logo } from '../Logo';
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../Loader';
import { useNavigate } from 'react-router-dom';
import Home from '../../../assets/Home.jpg';

export const LoginFormPage = () => {
  const { user, loading, login, register, loginWithGoogle } = useAuth();
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/welcome');
    }
  }, [user, navigate]);

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
            className="w-full h-[100%] object-cover rounded-lg shadow-lg"
            loading="lazy"
            src={Home}
            style={{ height: '-webkit-fill-available' }}
          />
        </div>
        <Testimonial />
      </div>

      <div className="flex-grow w-full lg:w-1/2 bg-gray-900 flex items-center justify-center p-6 lg:p-12">
        <div className="bg-gray-800 p-8 lg:p-10 rounded-lg w-full max-w-md shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105">
          <h2 className="text-white text-3xl font-bold mb-4 text-center">
            {isLogin ? "Sign In to Your Account" : "Create an Account"}
          </h2>

          <LoginForm
            onLoginSubmit={handleLoginSubmit}
            onRegisterSubmit={handleRegisterSubmit}
            errors={errors}
            onGoogleLogin={handleGoogleLogin}
            isLogin={isLogin}
          />

          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-300 hover:underline transition-all text-sm"
            >
              {isLogin ? "Need an account? Create one!" : "Already have an account? Sign in!"}
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

import { useState, useEffect, useCallback, useContext } from 'react';

import { AuthenticationContext } from '../contexts/authentication-context';
import { IAuthenticationService, IAuthenticationUser } from '@pps-easy/user/contracts';

export const useAuth = () => {
  const [user, setUser] = useState<IAuthenticationUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const authService = useContext<IAuthenticationService>(AuthenticationContext);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authService]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      throw error;
    }
  }, [authService]);

  const register = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const user = await authService.register(email, password);
      setUser(user);
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [authService]);

  const loginWithGoogle = useCallback(async () => {
    try {
      const result = await authService.loginWithGoogle();
      setUser(result);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }, [authService]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }, [authService]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      console.error('Error resetting password:', error);
      throw error;
    }
  }, [authService]);

  return {
    loading,
    login,
    loginWithGoogle,
    logout,
    register,
    resetPassword,
    user,
  };
};

import { useState, useEffect, useCallback } from 'react';
import { User } from 'firebase/auth';
import { IFirebaseAuthenticationService } from '../service/firebase-authentication-requirements';

export const useAuth = (authService: IFirebaseAuthenticationService) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [authService]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const userCredential = await authService.login(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.error('Error signing in with email and password:', error);
      throw error;
    }
  }, [authService]);

  const register = useCallback(async (email: string, password: string) => {
    setLoading(true);
    try {
      const userCredential = await authService.register(email, password);
      setUser(userCredential.user);
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
      setUser(result.user);
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

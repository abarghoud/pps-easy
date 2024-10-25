import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { FirebaseAuthenticationService } from '../../service/firebase-authentication-service';
import { auth } from "../../config/firebase";
import { useAuth } from '../../hooks/useAuth';
import { Loader } from '../../components/Loader';

export const PrivateRoute = () => {
  const authService = new FirebaseAuthenticationService(auth);

  const { user, loading } = useAuth(authService);

  if (loading) {
    return <Loader />;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

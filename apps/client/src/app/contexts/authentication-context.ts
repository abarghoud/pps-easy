import React from 'react';

import { IAuthenticationService } from '../service/authentication.interface';
import { FirebaseAuthenticationService } from '../service/firebase-authentication-service';
import { IUser } from '../interfaces/user.interface';

class NullAuthenticationService implements IAuthenticationService {
  onAuthStateChanged(callback: (user: IUser | null) => void): () => void {
    return () => {
      // empty
    };
  }
  login(email: string, password: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  register(email: string, password: string): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  loginWithGoogle(): Promise<IUser> {
    throw new Error('Method not implemented.');
  }
  logout(): Promise<void> {
    throw new Error('Method not implemented.');
  }
  resetPassword(email: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const AuthenticationContext = React.createContext<IAuthenticationService>(new NullAuthenticationService());

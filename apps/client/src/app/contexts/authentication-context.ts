import React from 'react';

import { IAuthenticationService, IAuthenticationUser } from '@pps-easy/user/contracts';

class NullAuthenticationService implements IAuthenticationService {
  public readonly authenticatedUser: IAuthenticationUser | null = null;

  onAuthStateChanged(callback: (user: IAuthenticationUser | null) => void): () => void {
    return () => {
      // empty
    };
  }
  login(email: string, password: string): Promise<IAuthenticationUser> {
    throw new Error('Method not implemented.');
  }
  register(email: string, password: string): Promise<IAuthenticationUser> {
    throw new Error('Method not implemented.');
  }
  loginWithGoogle(): Promise<IAuthenticationUser> {
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

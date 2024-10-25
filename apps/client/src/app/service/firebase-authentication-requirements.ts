import 'firebase/auth';
import { User } from 'firebase/auth';
import { UserCredential } from 'firebase/auth';

export interface IFirebaseAuthenticationService {
  onAuthStateChanged: (callback: (user: User | null) => void) => () => void;
  login: (email: string, password: string) => Promise<UserCredential>;
  register: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

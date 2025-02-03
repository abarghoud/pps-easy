import { IAuthenticationUser } from './authentication-user.interface';

export interface IAuthenticationService {
  readonly authenticatedUser: IAuthenticationUser | null;

  onAuthStateChanged(callback: (user: IAuthenticationUser | null) => void): () => void;
  login(email: string, password: string): Promise<IAuthenticationUser>;
  register(email: string, password: string): Promise<IAuthenticationUser>;
  loginWithGoogle(): Promise<IAuthenticationUser>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

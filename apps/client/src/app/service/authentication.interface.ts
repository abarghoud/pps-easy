import { IUser } from '../interfaces/user.interface';

export interface IAuthenticationService {
  onAuthStateChanged(callback: (user: IUser | null) => void): () => void;
  login(email: string, password: string): Promise<IUser>;
  register(email: string, password: string): Promise<IUser>;
  loginWithGoogle(): Promise<IUser>;
  logout(): Promise<void>;
  resetPassword(email: string): Promise<void>;
}

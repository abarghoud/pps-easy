import { IAuthenticationService } from './authentication.interface';
import { IUser } from '../interfaces/user.interface';

export class LocalAuthenticationService implements IAuthenticationService {
  private authenticatedUser: IUser | null = null;
  private authStateChangedCallback: ((user: IUser | null) => void) | undefined;

  public onAuthStateChanged(callback: (user: IUser | null) => void): () => void {
    this.authStateChangedCallback = callback;

    callback(this.authenticatedUser);

    return () => {
      this.authStateChangedCallback = undefined;
    }
  }

  public async login(email: string, password: string): Promise<IUser> {
    this.authenticatedUser = {
      email,
      displayName: null,
    }

    this.authStateChangedCallback?.call(this, this.authenticatedUser);

    return this.authenticatedUser;
  }

  public async register(email: string, password: string): Promise<IUser> {
    this.authenticatedUser = {
      email,
      displayName: null,
    }

    this.authStateChangedCallback?.call(this, this.authenticatedUser);

    return this.authenticatedUser;
  }

  public async loginWithGoogle(): Promise<IUser> {
    this.authenticatedUser = {
      email: 'test@google.com',
      displayName: null,
    }

    this.authStateChangedCallback?.call(this, this.authenticatedUser);

    return this.authenticatedUser;
  }

  public async logout(): Promise<void> {
    this.authenticatedUser = null;

    this.authStateChangedCallback?.call(this, this.authenticatedUser);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async resetPassword(email: string): Promise<void> {
  }
}

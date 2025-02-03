import { IAuthenticationService, IAuthenticationUser } from '@pps-easy/user/contracts';

export class LocalAuthenticationService implements IAuthenticationService {
  public authenticatedUser: IAuthenticationUser | null = null;
  private authStateChangedCallback: ((user: IAuthenticationUser | null) => void) | undefined;

  public onAuthStateChanged(callback: (user: IAuthenticationUser | null) => void): () => void {
    this.authStateChangedCallback = callback;

    callback(this.authenticatedUser);

    return () => {
      this.authStateChangedCallback = undefined;
    }
  }

  public async login(email: string, password: string): Promise<IAuthenticationUser> {
    this.authenticatedUser = {
      uid: '',
      email,
      displayName: null,
    }

    this.authStateChangedCallback?.call(this, this.authenticatedUser);

    return this.authenticatedUser;
  }

  public async register(email: string, password: string): Promise<IAuthenticationUser> {
    this.authenticatedUser = {
      uid: '',
      email,
      displayName: null,
    }

    this.authStateChangedCallback?.call(this, this.authenticatedUser);

    return this.authenticatedUser;
  }

  public async loginWithGoogle(): Promise<IAuthenticationUser> {
    this.authenticatedUser = {
      uid: '',
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

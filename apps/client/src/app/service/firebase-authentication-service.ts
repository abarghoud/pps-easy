import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  User,
  Auth,
} from 'firebase/auth';
import { IAuthenticationService } from './authentication.interface';
import { auth } from '../config/firebase';
import { IUser } from '../interfaces/user.interface';

export class FirebaseAuthenticationService implements IAuthenticationService {
  private readonly auth: Auth;

  constructor() {
    this.auth = auth;
  }

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  public async login(email: string, password: string): Promise<IUser> {
    return (await signInWithEmailAndPassword(this.auth, email, password)).user;
  }

  public async register(email: string, password: string): Promise<IUser> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  }

  public async loginWithGoogle(): Promise<IUser> {
    const provider = new GoogleAuthProvider();
    return (await signInWithPopup(this.auth, provider)).user;
  }

  public async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  public async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }
}
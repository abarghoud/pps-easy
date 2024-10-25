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
  UserCredential,
  Auth,
} from 'firebase/auth';
import { IFirebaseAuthenticationService } from './firebase-authentication-requirements';

export class FirebaseAuthenticationService implements IFirebaseAuthenticationService {
  private readonly auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  public async login(email: string, password: string): Promise<UserCredential> {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  public async register(email: string, password: string): Promise<UserCredential> {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  }

  public async loginWithGoogle(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();
    return await signInWithPopup(this.auth, provider);
  }

  public async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  public async resetPassword(email: string): Promise<void> {
    return await sendPasswordResetEmail(this.auth, email);
  }
}

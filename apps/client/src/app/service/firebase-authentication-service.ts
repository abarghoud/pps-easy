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

import { IRecaptchaChecker, IRecaptchaGenerator } from '@pps-easy/recaptcha/contracts';
import { ChallengeResult } from '@pps-easy/recaptcha/domain';

import { IAuthenticationService } from './authentication.interface';
import { initAuth } from '../config/firebase';
import { IUser } from '../interfaces/user.interface';

export class FirebaseAuthenticationService implements IAuthenticationService {
  private readonly auth: Auth;

  public constructor(
    private readonly recaptchaChecker: IRecaptchaChecker,
    private readonly recaptchaGenerator: IRecaptchaGenerator
  ) {
    this.auth = initAuth();
  }

  public onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(this.auth, callback);
  }

  public async login(email: string, password: string): Promise<IUser> {
    await this.verify();

    return (await signInWithEmailAndPassword(this.auth, email, password)).user;
  }

  public async register(email: string, password: string): Promise<IUser> {
    await this.verify();

    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential.user;
  }

  public async loginWithGoogle(): Promise<IUser> {
    await this.verify();

    const provider = new GoogleAuthProvider();
    return (await signInWithPopup(this.auth, provider)).user;
  }

  public async logout(): Promise<void> {
    return await signOut(this.auth);
  }

  public async resetPassword(email: string): Promise<void> {
    await this.verify();

    return await sendPasswordResetEmail(this.auth, email);
  }

  private async verify(): Promise<void> {
    const token = await this.recaptchaGenerator.generate();
    const challengeResultData = await this.recaptchaChecker.check(token);
    const challengeResul = new ChallengeResult(challengeResultData);

    if (!challengeResul.checkIsValid()) {
      throw new Error('Recaptcha token is not valid');
    }
  }
}

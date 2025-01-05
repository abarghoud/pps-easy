import { IAuthenticationService } from './authentication.interface';
import { IUser } from '../interfaces/user.interface';
import { initDb } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export class FirebaseUserEntityDocumentUpdater {
  private readonly db;

  public constructor(private readonly authentificationService: IAuthenticationService) {
    this.db = initDb();
  }

  public init(): void {
    this.authentificationService.onAuthStateChanged(this.onAuthStateChanged)
  }

  private onAuthStateChanged = async (user: IUser | null): Promise<void> => {
    debugger;
    if (user && user.uid) {
      const userDocReference = doc(this.db, 'users', user.uid);
      const docSnap = await getDoc(userDocReference);

      if (!docSnap.exists()) {
        await setDoc(userDocReference, { displayName: user.displayName, email: user.email });
      }
    }
  };
}

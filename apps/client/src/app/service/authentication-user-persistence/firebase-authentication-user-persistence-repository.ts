import { IUser } from '../../interfaces/user.interface';
import { IAuthenticationUserPersistenceProvider } from './authentication-user-persistence-provider.interface';
import { initDb } from '../../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export class FirebaseAuthenticationUserPersistenceRepository
  implements IAuthenticationUserPersistenceProvider
{
  private readonly db;

  public constructor() {
    this.db = initDb();
  }


  public async persist(user: IUser): Promise<void> {
    const userDocReference = doc(this.db, 'users', user.uid);
    const docSnap = await getDoc(userDocReference);

    if (!docSnap.exists()) {
      await setDoc(userDocReference, { displayName: user.displayName, email: user.email });
    }
  }
}

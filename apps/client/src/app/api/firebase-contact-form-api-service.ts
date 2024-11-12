import { IContactFormApi } from './contact-form-api.requirements';
import { addDoc, collection } from 'firebase/firestore';
import { initDb } from '../config/firebase';

export class FirebaseContactFormApiService implements IContactFormApi {
  private readonly db;

  public constructor() {
    this.db = initDb();
  }


  public async saveContact(email: string, name: string, message: string): Promise<void> {
    await addDoc(collection(this.db, 'messages'), {
      email,
      name,
      message,
    });
  }
}

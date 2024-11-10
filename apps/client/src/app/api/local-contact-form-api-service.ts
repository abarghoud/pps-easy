import { IContactFormApi } from './contact-form-api.requirements';

export class LocalContactFormApiService implements IContactFormApi {
  public async saveContact(email: string, name: string, message: string): Promise<void> {
    console.log(email, name, message);
  }
}

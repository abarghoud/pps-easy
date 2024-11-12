export interface IContactFormApi {
  saveContact(email: string, name: string, message: string): Promise<void>;
}

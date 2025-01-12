import { IUser } from '../../interfaces/user.interface';

export interface IAuthenticationUserPersistenceProvider {
  persist(user: IUser): Promise<void>;
}

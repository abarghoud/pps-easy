import { IAuthenticationUser } from '@pps-easy/user/contracts';

export interface IAuthenticationUserPersistenceProvider {
  persist(user: IAuthenticationUser): Promise<void>;
}

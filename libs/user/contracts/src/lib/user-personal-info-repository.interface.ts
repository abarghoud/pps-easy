import { UserPersonalInfoEntity } from '@pps-easy/user/domain';

export interface IUserPersonalInfoRepository {
  persist(userInfo: UserPersonalInfoEntity): Promise<void>;
  getPersonalInfo(): Promise<UserPersonalInfoEntity | undefined>;
}

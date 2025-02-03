import { doc, DocumentReference, getDoc, updateDoc } from 'firebase/firestore';
import { Firestore } from '@firebase/firestore';

import { IAuthenticationService, IUserPersonalInfoRepository } from '@pps-easy/user/contracts';
import { UserPersonalInfoEntity } from '@pps-easy/user/domain';

export class UserPersonalInfoFirebaseRepository
  implements IUserPersonalInfoRepository
{
  public constructor(private readonly db: Firestore, private readonly authenticationService: IAuthenticationService) {
  }

  public async persist(personalInfo: UserPersonalInfoEntity): Promise<void> {
    const userDocReference = this.getUserDoc();

    if (userDocReference) {
      await updateDoc(userDocReference, {
        personalInfo: personalInfo.toPlain()
      });
    }
  }

  public async getPersonalInfo(): Promise<UserPersonalInfoEntity | undefined> {
    const userDocReference = this.getUserDoc();

    if (userDocReference) {
      return (await getDoc(userDocReference))?.data()?.['personalInfo'];
    }

    return undefined;
  }

  private getUserDoc(): null | DocumentReference {
    if (this.authenticationService.authenticatedUser?.uid) {
      return doc(this.db, 'users', this.authenticationService.authenticatedUser.uid);
    }

    return null;
  }
}

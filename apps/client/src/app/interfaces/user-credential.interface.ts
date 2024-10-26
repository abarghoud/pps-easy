import { OperationType, User } from '@firebase/auth';

interface UserCredential {
  /**
   * The user authenticated by this credential.
   */
  user: User;
  /**
   * The provider which was used to authenticate the user.
   */
  providerId: string | null;
  /**
   * The type of operation which was used to authenticate the user (such as sign-in or link).
   */
  operationType: (typeof OperationType)[keyof typeof OperationType];
}

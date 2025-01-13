import { IAuthenticationUserPersistenceHandler } from './authentication-user-persistence-handler.interface';

export class DoNothingUserPersistenceHandler implements IAuthenticationUserPersistenceHandler {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public init(): void {}
}

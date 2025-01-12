import { IAuthenticationService } from '../authentication.interface';
import { IUser } from '../../interfaces/user.interface';
import { IAuthenticationUserPersistenceProvider } from './authentication-user-persistence-provider.interface';
import { IAuthenticationUserPersistenceStateTracker } from './authentication-user-persistence-state-tracker.interface';
import { IAuthenticationUserPersistenceHandler } from './authentication-user-persistence-handler.interface';

export class AuthenticationUserPersistenceHandler implements IAuthenticationUserPersistenceHandler {
  public constructor(
    private readonly authentificationService: IAuthenticationService,
    private readonly authenticationUserPersistenceProvider: IAuthenticationUserPersistenceProvider,
    private readonly authenticationUserPersistenceStateTracker: IAuthenticationUserPersistenceStateTracker
  ) {}

  public init(): void {
    this.authentificationService.onAuthStateChanged(this.onAuthStateChanged);
  }

  private onAuthStateChanged = async (user: IUser | null): Promise<void> => {
    if (
      user &&
      this.authenticationUserPersistenceStateTracker.checkShouldUpdate()
    ) {
      await this.authenticationUserPersistenceProvider.persist(user);
      this.authenticationUserPersistenceStateTracker.setUpdated();
    }
  };
}

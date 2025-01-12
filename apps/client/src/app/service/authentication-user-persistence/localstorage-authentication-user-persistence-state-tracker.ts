import { IAuthenticationUserPersistenceStateTracker } from './authentication-user-persistence-state-tracker.interface';
import { DateTime } from 'luxon';

export class LocalstorageAuthenticationUserPersistenceStateTracker
  implements IAuthenticationUserPersistenceStateTracker
{
  private readonly userEntityUpdatedAtKey = 'userEntityUpdatedAt'

  public setUpdated(): void {
    localStorage.setItem(this.userEntityUpdatedAtKey, DateTime.now().toISO());
  }

  public checkShouldUpdate(): boolean {
    const lastUpdatedAt = localStorage.getItem(this.userEntityUpdatedAtKey);

    if (!lastUpdatedAt) {
      return true;
    }

    return DateTime.fromISO(lastUpdatedAt) <= DateTime.now().minus({ months: 1 });
  }
}

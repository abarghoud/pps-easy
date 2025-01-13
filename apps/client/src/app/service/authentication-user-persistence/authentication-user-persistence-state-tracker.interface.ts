export interface IAuthenticationUserPersistenceStateTracker {
  setUpdated(): void;
  checkShouldUpdate(): boolean;
}

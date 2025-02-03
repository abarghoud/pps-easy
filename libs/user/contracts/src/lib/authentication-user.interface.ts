export interface IAuthenticationUser {
  readonly displayName: string | null;
  readonly email: string | null;
  readonly uid: string;
}

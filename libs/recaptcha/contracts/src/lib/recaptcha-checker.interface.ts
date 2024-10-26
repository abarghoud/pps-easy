export interface IRecaptchaChecker {
  check(token: string): Promise<boolean>;
}

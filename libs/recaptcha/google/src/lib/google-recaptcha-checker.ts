import { IRecaptchaChecker } from '@pps-easy/recaptcha/contracts';

export class GoogleRecaptchaChecker implements IRecaptchaChecker {
  public constructor(private readonly apiKey: string) {
  }

  public check(token: string): Promise<boolean> {

  }
}

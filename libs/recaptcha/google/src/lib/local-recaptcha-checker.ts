import {
  ChallengeResultData,
  IRecaptchaChecker,
} from '@pps-easy/recaptcha/contracts';

export class LocalRecaptchaChecker implements IRecaptchaChecker {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public check(token: string): Promise<ChallengeResultData> {
    return Promise.resolve({ score: 1, isValid: true, reasons: [] });
  }
}

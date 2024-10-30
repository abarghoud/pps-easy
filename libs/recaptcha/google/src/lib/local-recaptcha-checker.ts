import {
  ChallengeResultData,
  IRecaptchaChecker,
} from '@pps-easy/recaptcha/contracts';

export class LocalRecaptchaChecker implements IRecaptchaChecker {
  public check(token: string): Promise<ChallengeResultData> {
    return Promise.resolve({ score: 1, isValid: true, reasons: [] });
  }
}

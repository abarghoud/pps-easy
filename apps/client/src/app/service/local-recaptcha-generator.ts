import { IRecaptchaGenerator } from '@pps-easy/recaptcha/contracts';

export class LocalRecaptchaGenerator implements IRecaptchaGenerator {
  public generate(): Promise<string> {
    return Promise.resolve('FakeToken');
  }
}

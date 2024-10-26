import { IRecaptchaGenerator } from '@pps-easy/recaptcha/contracts';

export class GoogleRecaptchaGenerator implements IRecaptchaGenerator {
  public constructor(private readonly recaptchaKey: string) {
  }

  public generate(): Promise<string> {
    return new Promise((resolve, reject) => {
      grecaptcha.enterprise.ready(async () => {
        try {
          const token = await grecaptcha.enterprise.execute(this.recaptchaKey);
          resolve(token);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

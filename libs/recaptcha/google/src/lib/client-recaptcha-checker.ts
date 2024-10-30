import { AxiosInstance } from 'axios';

import {
  ChallengeResultData,
  IRecaptchaChecker,
} from '@pps-easy/recaptcha/contracts';

export class ClientRecaptchaChecker implements IRecaptchaChecker {
  public constructor(private readonly httpService: AxiosInstance) {
  }

  public async check(token: string): Promise<ChallengeResultData> {
    try {
      const response = await this.httpService.post('/api/recaptcha/check', { token });

      return response.data;
    } catch (error) {
      throw new Error('Failed to check recaptcha: ' + error);
    }
  }
}

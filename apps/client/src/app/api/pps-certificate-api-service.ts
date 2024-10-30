import { AxiosInstance } from 'axios';

import { IRecaptchaGenerator } from '@pps-easy/recaptcha/contracts';

import { GeneratePPSPayload, IPPSCertificateApiService } from './pps-certificate-service.requirements';

export class PPSCertificateApiService implements IPPSCertificateApiService {
  public constructor(private readonly httpService: AxiosInstance, private readonly recaptchaGenerator: IRecaptchaGenerator) {}

  public async generate(payload: GeneratePPSPayload) {
    try {
      const recaptchaToken = await this.recaptchaGenerator.generate();
      const response = await this.httpService.post('/api/pps/generate', { ...payload, recaptchaToken });

      return response.data;
    } catch (error) {
      PPSCertificateApiService.handleApiError(error);
      throw error;
    }
  }

  private static handleApiError(error: unknown): void {
    console.error('Error generating PPS:', error);

    if (error instanceof Error && error.message.includes('CORS')) {
      throw new Error('CORS error: Communication problem with the server.');
    } else {
      throw new Error('An error has occurred during certificate generation.');
    }
  }
}

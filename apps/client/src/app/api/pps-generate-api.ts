import axios from 'axios';
import { GeneratePPSPayload, IPPSGenerateAPI } from './pps-generate-api.requirements';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export class PPSGenerateAPI implements IPPSGenerateAPI {
  public async generate(payload: GeneratePPSPayload) {
    try {
      const response = await api.post('/api/pps/generate', payload);
      return response.data;
    } catch (error) {
      PPSGenerateAPI.handleApiError(error);
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

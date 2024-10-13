import axios from 'axios';
import { GeneratePPSPayload } from './pps-generate-api.requirements';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
});

export class PPSGenerateAPI implements PPSGenerateAPI {
  public static async generate(payload: GeneratePPSPayload) {
    try {
      const response = await api.post('/api/pps/generate', payload);
      return response.data;
    } catch (error) {
      this.handleApiError(error);
      throw error;
    }
  }

  private static handleApiError(error: unknown): void {
    console.error('Error generating PPS:', error);
    if (error instanceof Error && error.message.includes('CORS')) {
      throw new Error('Erreur CORS: Problème de communication avec le serveur.');
    } else {
      throw new Error('Une erreur est survenue lors de la génération du certificat.');
    }
  }
}

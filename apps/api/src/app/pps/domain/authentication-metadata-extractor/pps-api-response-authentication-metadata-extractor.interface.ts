import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const IPPSApiResponseAuthenticationMetaDataExtractorSymbol = Symbol.for('IPPSApiResponseAuthenticationMetaDataExtractor');

export interface IAuthenticationMetadata {
  sessionId: string;
  authenticityToken: string;
}

export interface IPPSApiResponseAuthenticationMetaDataExtractor {
  track(axiosResponse: AxiosResponse): void;
  generateAxiosHeaderWithSessionData(): AxiosRequestConfig;
  getAuthenticityToken(): string;
}

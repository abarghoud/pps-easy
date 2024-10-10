import { AxiosResponse } from 'axios';

export const IPPSApiResponseAuthenticationMetaDataExtractorSymbol = Symbol.for('IPPSApiResponseAuthenticationMetaDataExtractor');

export interface IAuthenticationMetadata {
  sessionId: string;
  authenticityToken: string;
}

export interface IPPSApiResponseAuthenticationMetaDataExtractor {
  extract(axiosResponse: AxiosResponse): IAuthenticationMetadata;
}

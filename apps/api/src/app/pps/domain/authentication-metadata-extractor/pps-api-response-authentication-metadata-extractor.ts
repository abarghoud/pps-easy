import { Inject, Injectable } from '@nestjs/common';

import {
  AxiosResponse,
  RawAxiosResponseHeaders,
  AxiosResponseHeaders,
  AxiosRequestConfig,
  RawAxiosRequestHeaders
} from 'axios';

import { IHtmlParser, IHtmlParserSymbol } from '@easy-pps/html-parser/contracts';

import {
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IAuthenticationMetadata
} from './pps-api-response-authentication-metadata-extractor.interface';

@Injectable()
export class PPSApiResponseAuthenticationMetaDataExtractor
  implements IPPSApiResponseAuthenticationMetaDataExtractor
{
  private readonly defaultHeaders: RawAxiosRequestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Connection: 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
    Accept: '*/*',
  };
  private lastRequestAuthenticationMetadata: IAuthenticationMetadata = {
    authenticityToken: '',
    sessionId: '',
  };

  public constructor(
    @Inject(IHtmlParserSymbol) private readonly htmlParser: IHtmlParser
  ) {}

  public getAuthenticityToken(): string {
    return this.lastRequestAuthenticationMetadata.authenticityToken;
  }

  public track(axiosResponse: AxiosResponse): void {
    if (axiosResponse.status != 200) {
      throw JSON.stringify(axiosResponse);
    }

    try {
      const sessionId = this.extractSessionIdFromHeaders(axiosResponse.headers);
      const authenticityTokenInputValue =
        this.extractAuthenticityTokenInputValue(axiosResponse.data);

      this.lastRequestAuthenticationMetadata = {
        authenticityToken: authenticityTokenInputValue,
        sessionId,
      };
    } catch (error) {
      throw new Error(
        `Failed extracting authentication metadata for response : \n ${JSON.stringify(
          axiosResponse
        )}\n\n Error occurred : ${error.message}`
      );
    }
  }

  public generateAxiosHeaderWithSessionData(): AxiosRequestConfig {
    return {
      headers: {
        ...this.defaultHeaders,
        Cookie: `_pps_app_session=${this.lastRequestAuthenticationMetadata.sessionId}`,
      },
    };
  }

  private extractSessionIdFromHeaders(
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders
  ): string {
    const sessionCookieName = '_pps_app_session=';
    const cookies = headers['set-cookie'];
    const ppsSessionCookie = cookies?.find((cookie: string) =>
      cookie.includes(sessionCookieName)
    );
    const cookieValue = ppsSessionCookie?.split(';')[0].split('=')[1];

    if (!cookieValue) {
      throw new Error(
        `PPS Session Id Cookie not found in ${JSON.stringify(headers)}`
      );
    }

    return cookieValue;
  }

  private extractAuthenticityTokenInputValue(data: string): string {
    const authenticity_token = this.htmlParser.getInputValueByName(
      data,
      'authenticity_token'
    );

    if (!authenticity_token) {
      throw new Error(
        `Unable to find authenticity token it this html : ${data}`
      );
    }

    if (Array.isArray(authenticity_token)) {
      return authenticity_token[0];
    }

    return authenticity_token;
  }
}

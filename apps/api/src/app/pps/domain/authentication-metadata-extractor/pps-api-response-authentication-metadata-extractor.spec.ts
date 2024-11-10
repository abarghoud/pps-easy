import { Test, TestingModule } from '@nestjs/testing';

import { AxiosResponse } from 'axios';

import { PPSApiResponseAuthenticationMetaDataExtractor } from './pps-api-response-authentication-metadata-extractor';
import { IHtmlParser, IHtmlParserSymbol } from '@easy-pps/html-parser/contracts';
import { mock } from 'jest-mock-extended';

describe('The PPSApiResponseAuthenticationMetaDataExtractor class', () => {
  let app: TestingModule;
  const mockHtmlParser = mock<IHtmlParser>();

  beforeEach(async () => {
    app = await Test.createTestingModule({
      providers: [
        PPSApiResponseAuthenticationMetaDataExtractor,
        { provide: IHtmlParserSymbol, useValue: mockHtmlParser }
      ]
    }).compile();
  });

  it('should be defined', () => {
    expect(app.get(PPSApiResponseAuthenticationMetaDataExtractor)).toBeDefined();
  });

  describe('The track method', () => {
    describe('When axios response is errored', () => {
      it('should throw axios response as json', () => {
        const axiosResponse = { status: 400, data: 'race date should be within three months', statusText: 'bad request' } as AxiosResponse;
        const callback = () => app.get(PPSApiResponseAuthenticationMetaDataExtractor).track(axiosResponse);

        expect(callback).toThrow(JSON.stringify(axiosResponse));
      });
    });

    describe('When axios response does not contain the cookie', () => {
      it('should throw exception', () => {
        const axiosResponse = { status: 200, headers: { Cookie: '' } } as unknown as AxiosResponse;
        const callback = () => app.get(PPSApiResponseAuthenticationMetaDataExtractor).track(axiosResponse);

        expect(callback).toThrow(expect.objectContaining({ message: expect.stringContaining('Failed extracting authentication metadata for response :') }));
      });
    });

    describe('When axios response is OK', () => {
      beforeEach(() => {
        mockHtmlParser.getInputValueByName.mockReturnValueOnce('QSQS1212');
      });

      it('should extract session id from the cookie and authenticity token from the html using html-parser service', () => {
        const sessionId = 'ijeBk462CBSVUfYozH9j2%2FW3oTOy%2FKESUNKg7VhWoqXdfVQoFNqhra0fcl43qqPZDfpvfa3CljlZLgZ%2FieVVjxDJFMN19Vto2uKq4Zck95debtv4lAbRe0Fwl52crKzmjLKUu7zg';
        const html = '<div><input name="authenticity_token" value="QSQS1212"/> </div>';
        const axiosResponse = {
          data: html,
          headers: {
            'set-cookie': [`_pps_app_session=${sessionId}`]
          },
          status: 200,
          statusText: 'OK',
        } as unknown as AxiosResponse;
        const metadataExtractor = app.get(PPSApiResponseAuthenticationMetaDataExtractor);
        metadataExtractor.track(axiosResponse);

        expect(metadataExtractor.generateAxiosHeaderWithSessionData()).toEqual(
          expect.objectContaining({
            headers: expect.objectContaining({
              Cookie: expect.stringContaining(sessionId),
            }),
          }),
        );
        expect(metadataExtractor.getAuthenticityToken()).toBe('QSQS1212');
      });
    });
  });
});

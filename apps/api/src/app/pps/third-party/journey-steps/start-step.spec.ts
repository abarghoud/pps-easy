import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';

import { mock } from 'jest-mock-extended'
import { of } from 'rxjs';
import { AxiosResponse } from 'axios';;

import { StartStep } from './start-step';
import {
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { ApiRoutesConstants } from '../../constants/api-routes-constants';

describe('The StartStep class', () => {
  let app: TestingModule;
  const mockHttpService = mock<HttpService>();
  const mockMetadataExtractor = mock<IPPSApiResponseAuthenticationMetaDataExtractor>();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        StartStep,
        { provide: HttpService, useValue: mockHttpService },
        { provide: IPPSApiResponseAuthenticationMetaDataExtractorSymbol, useValue: mockMetadataExtractor }
      ],
    }).compile();
  });

  describe('The doStep method', () => {
    const getResult = {
      status: 200,
      data: 'result',
      statusText: 'ok',
      headers: {}
    } as AxiosResponse;

    beforeAll(async () => {
      mockHttpService.get.mockReturnValueOnce(of(getResult));

      await app.get(StartStep).doStep();
    })

    it('should do a get request to pps entry point', () => {
      expect(mockHttpService.get).toHaveBeenCalledWith(ApiRoutesConstants.DefaultEntry);
    });

    it('should track request result', () => {
      expect(mockMetadataExtractor.track).toHaveBeenCalledWith(getResult);
    });
  });
});

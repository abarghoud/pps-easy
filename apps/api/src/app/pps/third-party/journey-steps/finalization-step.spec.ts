import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';

import { of } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { mock } from 'jest-mock-extended';

import {
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { ApiRoutesConstants } from '../../constants/api-routes-constants';
import { PPSApiFormDataGenerator } from '../pps-api-form-data-generator';
import { FinalizationStep } from './finalization-step';

describe('The FinalizationStep class', () => {
  let app: TestingModule;
  const mockHttpService = mock<HttpService>();
  const mockMetadataExtractor = mock<IPPSApiResponseAuthenticationMetaDataExtractor>();
  const mockPpsApiFormDataGenerator = mock<PPSApiFormDataGenerator>();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        FinalizationStep,
        { provide: HttpService, useValue: mockHttpService },
        { provide: IPPSApiResponseAuthenticationMetaDataExtractorSymbol, useValue: mockMetadataExtractor },
        { provide: PPSApiFormDataGenerator, useValue: mockPpsApiFormDataGenerator }
      ],
    }).compile();
  });

  describe('The doStep method', () => {
    const postResult = {
      status: 200,
      data: 'result',
      statusText: 'ok',
      headers: {}
    } as AxiosResponse;
    const mockFinalizationFormData = new FormData();
    const mockAxiosConfigWithHeader = {
      headers: { Cookie: '_pps_app_session=12JIQOS12PJQ12' },
    } as AxiosRequestConfig;
    let result: string | void;

    beforeAll(async () => {
      mockHttpService.post.mockReturnValueOnce(of(postResult));
      mockPpsApiFormDataGenerator.generateFinalizationFormData.mockReturnValueOnce(mockFinalizationFormData);
      mockMetadataExtractor.generateAxiosHeaderWithSessionData.mockReturnValueOnce(mockAxiosConfigWithHeader);

      result = await app.get(FinalizationStep).doStep();
    })

    it('should do a post request to pps cardiovascular endpoint', () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.Finalization,
        mockFinalizationFormData,
        mockAxiosConfigWithHeader,
      );
    });

    it('should return post result data', () => {
      expect(result).toBe(postResult.data);
    });
  });
});

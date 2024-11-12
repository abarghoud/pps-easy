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
import { PrecautionsStep } from './precautions-step';

describe('The PrecautionsStep class', () => {
  let app: TestingModule;
  const mockHttpService = mock<HttpService>();
  const mockMetadataExtractor = mock<IPPSApiResponseAuthenticationMetaDataExtractor>();
  const mockPpsApiFormDataGenerator = mock<PPSApiFormDataGenerator>();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        PrecautionsStep,
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
    const mockPrecautionsFormData = new FormData();
    const mockAxiosConfigWithHeader = {
      headers: { Cookie: '_pps_app_session=12JIQOS12PJQ12' },
    } as AxiosRequestConfig;

    beforeAll(async () => {
      mockHttpService.post.mockReturnValueOnce(of(postResult));
      mockPpsApiFormDataGenerator.generatePrecautionsFormData.mockReturnValueOnce(mockPrecautionsFormData);
      mockMetadataExtractor.generateAxiosHeaderWithSessionData.mockReturnValueOnce(mockAxiosConfigWithHeader);

      await app.get(PrecautionsStep).doStep();
    })

    it('should do a post request to pps precautions endpoint', () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.Precautions,
        mockPrecautionsFormData,
        mockAxiosConfigWithHeader,
      );
    });

    it('should track request result', () => {
      expect(mockMetadataExtractor.track).toHaveBeenCalledWith(postResult);
    });
  });
});

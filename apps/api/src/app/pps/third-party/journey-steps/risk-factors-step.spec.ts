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
import { RiskFactorsStep } from './risk-factors-step';

describe('The RiskFactorsStep class', () => {
  let app: TestingModule;
  const mockHttpService = mock<HttpService>();
  const mockMetadataExtractor = mock<IPPSApiResponseAuthenticationMetaDataExtractor>();
  const mockPpsApiFormDataGenerator = mock<PPSApiFormDataGenerator>();

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        RiskFactorsStep,
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
    const mockRiskFactorsFormData = new FormData();
    const mockAxiosConfigWithHeader = {
      headers: { Cookie: '_pps_app_session=12JIQOS12PJQ12' },
    } as AxiosRequestConfig;

    beforeAll(async () => {
      mockHttpService.post.mockReturnValueOnce(of(postResult));
      mockPpsApiFormDataGenerator.generateRiskFactorsFormData.mockReturnValueOnce(mockRiskFactorsFormData);
      mockMetadataExtractor.generateAxiosHeaderWithSessionData.mockReturnValueOnce(mockAxiosConfigWithHeader);

      await app.get(RiskFactorsStep).doStep();
    })

    it('should do a post request to pps risk factors endpoint', () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.RiskFactors,
        mockRiskFactorsFormData,
        mockAxiosConfigWithHeader,
      );
    });

    it('should track request result', () => {
      expect(mockMetadataExtractor.track).toHaveBeenCalledWith(postResult);
    });
  });
});

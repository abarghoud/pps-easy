import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';

import {  AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { mock } from 'jest-mock-extended';

import { PPSApi, PPSApiErrors } from './pps-api';
import { ApiRoutesConstants } from '../constants/api-routes-constants';
import { of } from 'rxjs';
import { PPSApiFormDataGenerator } from './pps-api-form-data-generator';
import { PPSProfileDTOToRunnerPersonalInfos } from '../domain/pps-profile-dto-to-runner-personal-infos';
import { PPSProfileDto } from '../domain/pps-profile-dto.model';
import {
  IAuthenticationMetadata,
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { Scope } from '@nestjs/common';
import { PPSId } from '../domain/pps-id.type';

const getFakePPSDto = (): PPSProfileDto => {
  const ppsDto = new PPSProfileDto();

  ppsDto.event_date = new Date('2024-12-31');

  return ppsDto;
};

describe('The PPSApi service', () => {
  let app: TestingModule;

  const mockHttpService = mock<HttpService>();
  const mockPPSAuthenticationMetadataExtractor = mock<IPPSApiResponseAuthenticationMetaDataExtractor>();
  const defaultHeaders: RawAxiosRequestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Connection': 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': '*/*',
  };
  const ppsDto = getFakePPSDto();
  const initRequestAuthMetadata: IAuthenticationMetadata = {
    authenticityToken: 'initAuthToken',
    sessionId: 'initSessionId',
  };
  const raceDateRequestAuthMetadata: IAuthenticationMetadata = {
    authenticityToken: 'raceDateAuthToken',
    sessionId: 'raceDateInitSessionId',
  };
  const personalInfoRequestAuthMetadata: IAuthenticationMetadata = {
    authenticityToken: 'personalInfoAuthToken',
    sessionId: 'personalInfoSessionId',
  };
  const cardiovascularRisksRequestAuthMetadata: IAuthenticationMetadata = {
    authenticityToken: 'cardiovascularRisksAuthToken',
    sessionId: 'cardiovascularRisksSessionId',
  };
  const riskFactorsRequestAuthMetadata: IAuthenticationMetadata = {
    authenticityToken: 'riskFactorsAuthToken',
    sessionId: 'riskFactorsSessionId',
  };
  const precautionRequestAuthMetadata: IAuthenticationMetadata = {
    authenticityToken: 'precautionAuthToken',
    sessionId: 'precautionSessionId',
  };
  const ppsProfile = new PPSProfileDTOToRunnerPersonalInfos(ppsDto)
  const ppsApiFormDataGenerator = new PPSApiFormDataGenerator(ppsProfile)
  const finalizationResponseHtml = '<body>Félicitations, votre certificat a été généré</body>';

  beforeAll(async () => {
    app = await Test.createTestingModule({
      providers: [
        { provide: PPSApi, useClass: PPSApi, scope: Scope.TRANSIENT },
        { provide: HttpService, useValue: mockHttpService },
        {
          provide: IPPSApiResponseAuthenticationMetaDataExtractorSymbol,
          useValue: mockPPSAuthenticationMetadataExtractor,
        },
      ],
    }).compile();

    mockHttpService.get.mockReturnValue(of({} as AxiosResponse));
    mockHttpService.post.mockImplementation((endpoint: ApiRoutesConstants) => {
      if (endpoint === ApiRoutesConstants.Finalization) {
        return of({
          data: finalizationResponseHtml,
          status: 200,
        } as AxiosResponse);
      }

      return of({} as AxiosResponse);
    })
  });

  it('should be defined', async () => {
    expect(await app.resolve(PPSApi)).toBeDefined();
  });

  describe('The init method', () => {
    beforeAll(async () => {
      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(initRequestAuthMetadata);

      await (await app.resolve(PPSApi)).init(ppsDto);
    });

    it('should call pps entry endpoint to init the journey', () => {
      expect(mockHttpService.get).toHaveBeenCalledWith(ApiRoutesConstants.DefaultEntry);
    });

    it('should call pps course_date route with the race date and authenticity_token and session_id cookie previous step', () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.Course,
        ppsApiFormDataGenerator.generateEventDateFormData(
          initRequestAuthMetadata.authenticityToken
        ),
        { headers: { ...defaultHeaders, Cookie: `_pps_app_session=${initRequestAuthMetadata.sessionId}` } }
      );
    });
  });

  describe('The createProfile method', () => {
    describe('When called without init method being called before', () => {
      it('should throw an exception because no pps profile is provided', async () => {
        expect((await app.resolve(PPSApi)).createProfile()).rejects.toThrow(PPSApiErrors.ProfileNotProvided);
      });
    });

    describe('When called with init method being called before', () => {
      let ppsApi: PPSApi;

      beforeEach(async () => {
        ppsApi = await app.resolve(PPSApi)

        mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(initRequestAuthMetadata);
        mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(raceDateRequestAuthMetadata);

        await ppsApi.init(ppsDto);
        await ppsApi.createProfile();
      });

      it('should call pps personalInfo route with personalInfo, authenticity_token and session_id cookie previous step', async () => {
        expect(mockHttpService.post).toHaveBeenCalledWith(
          ApiRoutesConstants.PersonalInfos,
          ppsApiFormDataGenerator.generatePersonalInfoFormData(
            raceDateRequestAuthMetadata.authenticityToken
          ),
          { headers: { ...defaultHeaders, Cookie: `_pps_app_session=${raceDateRequestAuthMetadata.sessionId}` } }
        )
      })
    });
  });

  describe('The finalize method', () => {
    let ppsApi: PPSApi;
    let result: PPSId;

    beforeEach(async () => {
      ppsApi = await app.resolve(PPSApi)

      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(initRequestAuthMetadata);
      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(raceDateRequestAuthMetadata);
      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(personalInfoRequestAuthMetadata);
      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(cardiovascularRisksRequestAuthMetadata);
      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(riskFactorsRequestAuthMetadata);
      mockPPSAuthenticationMetadataExtractor.extract.mockReturnValueOnce(precautionRequestAuthMetadata);

      await ppsApi.init(ppsDto);
      await ppsApi.createProfile();
      result = await ppsApi.finalize();
    });

    it('should call pps cardiovascular risks route with approval data, authenticity_token and session_id cookie previous step', async () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.CardiovascularRisks,
        ppsApiFormDataGenerator.generateCardiovascularRisksFormData(
          personalInfoRequestAuthMetadata.authenticityToken
        ),
        { headers: { ...defaultHeaders, Cookie: `_pps_app_session=${personalInfoRequestAuthMetadata.sessionId}` } }
      )
    });

    it('should call pps risk factors route with approval data, authenticity_token and session_id cookie previous step', async () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.RiskFactors,
        ppsApiFormDataGenerator.generateRiskFactorsFormData(
          cardiovascularRisksRequestAuthMetadata.authenticityToken
        ),
        { headers: { ...defaultHeaders, Cookie: `_pps_app_session=${cardiovascularRisksRequestAuthMetadata.sessionId}` } }
      )
    });

    it('should call pps precautions route with approval data, authenticity_token and session_id cookie previous step', async () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.Precautions,
        ppsApiFormDataGenerator.generatePrecautionsFormData(
          riskFactorsRequestAuthMetadata.authenticityToken
        ),
        { headers: { ...defaultHeaders, Cookie: `_pps_app_session=${riskFactorsRequestAuthMetadata.sessionId}` } }
      )
    });

    it('should call pps finalize route with approval data, authenticity_token and session_id cookie previous step', async () => {
      expect(mockHttpService.post).toHaveBeenCalledWith(
        ApiRoutesConstants.Finalization,
        ppsApiFormDataGenerator.generateFinalizationFormData(
          precautionRequestAuthMetadata.authenticityToken
        ),
        { headers: { ...defaultHeaders, Cookie: `_pps_app_session=${precautionRequestAuthMetadata.sessionId}` } }
      )
    });

    it('Should return axios response data', async () => {
      expect(result).toBe(finalizationResponseHtml);
    });
  });
});

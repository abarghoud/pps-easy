import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { IPPSApi } from './pps-api.interface';
import { PPSProfileDto } from '../domain/pps-profile-dto.model';
import { ApiRoutesConstants } from '../constants/api-routes-constants';
import { AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
import { lastValueFrom } from 'rxjs';
import { PPSApiFormDataGenerator } from './pps-api-form-data-generator';
import { PPSProfileDTOToRunnerPersonalInfos } from '../domain/pps-profile-dto-to-runner-personal-infos';
import {
  IAuthenticationMetadata,
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';

export enum PPSApiErrors {
  ProfileNotProvided = 'PPS Profile is missing, please make sure you called init with a valid profile before'
}

@Injectable()
export class PPSApi implements IPPSApi {
  private readonly defaultHeaders: RawAxiosRequestHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Connection': 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': '*/*',
  };
  private ppsApiFormDataGenerator: PPSApiFormDataGenerator;
  private lastRequestAuthenticationMetadata: IAuthenticationMetadata;

  public constructor(
    private readonly httpService: HttpService,
    @Inject(IPPSApiResponseAuthenticationMetaDataExtractorSymbol)
    private readonly ppsApiResponseAuthenticationMetaDataExtractor: IPPSApiResponseAuthenticationMetaDataExtractor,
  ) {}

  public async init(ppsProfileDto: PPSProfileDto): Promise<void> {
    this.ppsApiFormDataGenerator = new PPSApiFormDataGenerator(new PPSProfileDTOToRunnerPersonalInfos(ppsProfileDto))

    await this.sendGetRequest(ApiRoutesConstants.DefaultEntry);

    await this.sendPostRequest(
      ApiRoutesConstants.Course,
      this.ppsApiFormDataGenerator.generateEventDateFormData(this.lastRequestAuthenticationMetadata.authenticityToken)
    );
  }

  public async createProfile(): Promise<void> {
    if (!this.ppsApiFormDataGenerator) {
      throw new Error(PPSApiErrors.ProfileNotProvided)
    }

    await this.sendPostRequest(
      ApiRoutesConstants.PersonalInfos,
      this.ppsApiFormDataGenerator.generatePersonalInfoFormData(this.lastRequestAuthenticationMetadata.authenticityToken)
    );
  }

  public async finalize(): Promise<string> {
    await this.sendPostRequest(
      ApiRoutesConstants.CardiovascularRisks,
      this.ppsApiFormDataGenerator.generateCardiovascularRisksFormData(this.lastRequestAuthenticationMetadata.authenticityToken)
    )

    await this.sendPostRequest(
      ApiRoutesConstants.RiskFactors,
      this.ppsApiFormDataGenerator.generateRiskFactorsFormData(this.lastRequestAuthenticationMetadata.authenticityToken),
    );

    await this.sendPostRequest(
      ApiRoutesConstants.Precautions,
      this.ppsApiFormDataGenerator.generatePrecautionsFormData(this.lastRequestAuthenticationMetadata.authenticityToken),
    );

    const finalizationResult = await this.sendPostRequest(
      ApiRoutesConstants.Finalization,
      this.ppsApiFormDataGenerator.generateFinalizationFormData(this.lastRequestAuthenticationMetadata.authenticityToken),
      false
    );

    return finalizationResult.data;
  }

  private async sendPostRequest(endpoint: ApiRoutesConstants, formData: FormData, shouldStoreAuthenticationMetadata = true): Promise<AxiosResponse> {
    const result = await lastValueFrom(
      this.httpService.post(
        endpoint,
        formData,
        this.generateAxiosConfigWithNecessaryHeader())
    );

    if (shouldStoreAuthenticationMetadata) {
      this.lastRequestAuthenticationMetadata = this.ppsApiResponseAuthenticationMetaDataExtractor.extract(result);
    }

    return result;
  }

  private async sendGetRequest(endpoint: ApiRoutesConstants): Promise<AxiosResponse> {
    const result = await lastValueFrom(
      this.httpService.get(endpoint)
    );
    this.lastRequestAuthenticationMetadata = this.ppsApiResponseAuthenticationMetaDataExtractor.extract(result);

    return result;
  }

  private generateAxiosConfigWithNecessaryHeader(): AxiosRequestConfig {
    return {
      headers: { ...this.defaultHeaders, Cookie: `_pps_app_session=${this.lastRequestAuthenticationMetadata.sessionId}` },
    };
  }
}

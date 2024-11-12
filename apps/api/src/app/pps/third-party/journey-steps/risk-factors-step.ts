import { IPPSStep } from './pps-step.interface';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';
import {
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { PPSApiFormDataGenerator } from '../pps-api-form-data-generator';
import { lastValueFrom } from 'rxjs';
import { ApiRoutesConstants } from '../../constants/api-routes-constants';

export class RiskFactorsStep implements IPPSStep {
  public constructor(
    private readonly httpService: HttpService,
    @Inject(IPPSApiResponseAuthenticationMetaDataExtractorSymbol)
    private readonly ppsApiResponseAuthenticationMetaDataExtractor: IPPSApiResponseAuthenticationMetaDataExtractor,
    private readonly ppsApiFormDataGenerator: PPSApiFormDataGenerator,
  ) {}

  public async doStep(): Promise<string | void> {
    const result = await lastValueFrom(
      this.httpService.post(
        ApiRoutesConstants.RiskFactors,
        this.ppsApiFormDataGenerator.generateRiskFactorsFormData(this.ppsApiResponseAuthenticationMetaDataExtractor.getAuthenticityToken()),
        this.ppsApiResponseAuthenticationMetaDataExtractor.generateAxiosHeaderWithSessionData()
      )
    );

    this.ppsApiResponseAuthenticationMetaDataExtractor.track(result);
  }
}
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Inject } from '@nestjs/common';

import { IPPSStep } from './pps-step.interface';
import {
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { ApiRoutesConstants } from '../../constants/api-routes-constants';
import { PPSApiFormDataGenerator } from '../pps-api-form-data-generator';

export class RaceInformationStep implements IPPSStep {
  public constructor(
    private readonly httpService: HttpService,
    @Inject(IPPSApiResponseAuthenticationMetaDataExtractorSymbol)
    private readonly ppsApiResponseAuthenticationMetaDataExtractor: IPPSApiResponseAuthenticationMetaDataExtractor,
    private readonly ppsApiFormDataGenerator: PPSApiFormDataGenerator,
  ) {}

  public async doStep(
  ): Promise<string | void> {
    const result = await lastValueFrom(
      this.httpService.post(
        ApiRoutesConstants.Course,
        this.ppsApiFormDataGenerator.generateEventDateFormData(this.ppsApiResponseAuthenticationMetaDataExtractor.getAuthenticityToken()),
        this.ppsApiResponseAuthenticationMetaDataExtractor.generateAxiosHeaderWithSessionData()
      )
    );

    this.ppsApiResponseAuthenticationMetaDataExtractor.track(result);
  }
}

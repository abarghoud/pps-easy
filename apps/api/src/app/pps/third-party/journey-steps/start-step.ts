import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';

import {
  IPPSApiResponseAuthenticationMetaDataExtractor,
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from '../../domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { IPPSStep } from './pps-step.interface';
import { lastValueFrom } from 'rxjs';
import { ApiRoutesConstants } from '../../constants/api-routes-constants';

@Injectable()
export class StartStep implements IPPSStep {
  public constructor(
    private readonly httpService: HttpService,
    @Inject(IPPSApiResponseAuthenticationMetaDataExtractorSymbol)
    private readonly ppsApiResponseAuthenticationMetaDataExtractor: IPPSApiResponseAuthenticationMetaDataExtractor,
  ) {}

  public async doStep(): Promise<void> {
    const result = await lastValueFrom(
      this.httpService.get(ApiRoutesConstants.DefaultEntry)
    );

    this.ppsApiResponseAuthenticationMetaDataExtractor.track(result);
  }
}

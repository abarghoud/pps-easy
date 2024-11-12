import { Module, Scope } from '@nestjs/common';
import { IPPSGenerateUseCaseSymbol } from './usecase/pps-generate-usecase.interface';
import { PPSGeneratorUseCase } from './usecase/pps-generator-usecase.service';
import { IPPSApiSymbol } from './third-party/pps-api.interface';
import { PPSApi } from './third-party/pps-api';
import { PPSApiFormDataGenerator } from './third-party/pps-api-form-data-generator';
import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { StartStep } from './third-party/journey-steps/start-step';
import { RaceInformationStep } from './third-party/journey-steps/race-information-step';
import { PersonalInformationStep } from './third-party/journey-steps/personal-information-step';
import { CardiovascularStep } from './third-party/journey-steps/cardiovascular-step';
import { RiskFactorsStep } from './third-party/journey-steps/risk-factors-step';
import { PrecautionsStep } from './third-party/journey-steps/precautions-step';
import { FinalizationStep } from './third-party/journey-steps/finalization-step';
import { IPPSStepListSymbol } from './third-party/journey-steps/pps-step.interface';
import {
  IPPSApiResponseAuthenticationMetaDataExtractorSymbol
} from './domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import {
  PPSApiResponseAuthenticationMetaDataExtractor
} from './domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor';
import { SharedModule } from '../shared/shared.module';
import { PPSProfileDTOToRunnerPersonalInfos } from './domain/pps-profile-dto-to-runner-personal-infos';

@Module({
  exports: [IPPSGenerateUseCaseSymbol],
  imports: [SharedModule],
  providers: [
    {
      provide: IPPSGenerateUseCaseSymbol,
      useClass: PPSGeneratorUseCase,
      scope: Scope.REQUEST,
    },
    { provide: IPPSApiSymbol, useClass: PPSApi, scope: Scope.REQUEST },
    {
      provide: PPSApiFormDataGenerator,
      useFactory: (request: Request) =>
        new PPSApiFormDataGenerator(new PPSProfileDTOToRunnerPersonalInfos(request.body)),
      inject: [REQUEST],
      scope: Scope.REQUEST,
    },
    StartStep,
    RaceInformationStep,
    PersonalInformationStep,
    CardiovascularStep,
    RiskFactorsStep,
    PrecautionsStep,
    FinalizationStep,
    {
      provide: IPPSStepListSymbol,
      useFactory: (
        startStep: StartStep,
        raceInformationStep: RaceInformationStep,
        personalInformationStep: PersonalInformationStep,
        cardiovascularStep: CardiovascularStep,
        riskFactorsStep: RiskFactorsStep,
        precautionsStep: PrecautionsStep,
        finalizationStep: FinalizationStep
      ) => [
        startStep,
        raceInformationStep,
        personalInformationStep,
        cardiovascularStep,
        riskFactorsStep,
        precautionsStep,
        finalizationStep,
      ],
      inject: [
        StartStep,
        RaceInformationStep,
        PersonalInformationStep,
        CardiovascularStep,
        RiskFactorsStep,
        PrecautionsStep,
        FinalizationStep,
      ],
    },
    {
      provide: IPPSApiResponseAuthenticationMetaDataExtractorSymbol,
      useClass: PPSApiResponseAuthenticationMetaDataExtractor,
      scope: Scope.REQUEST,
    },
  ],
})
export class PPSModule {}

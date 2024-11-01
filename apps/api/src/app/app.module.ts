import { Module, OnModuleInit, Scope } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';

import { Agent } from 'https';

import { IHtmlParserSymbol } from '@easy-pps/html-parser/contracts';
import { HtmlParser } from '@easy-pps';

import { GenerateController } from './generate.controller';
import { PPSGeneratorUseCase } from './pps/usecase/pps-generator-usecase.service';
import { IPPSGenerateUseCaseSymbol } from './pps/usecase/pps-generate-usecase.interface';
import { IPPSApiSymbol } from './pps/third-party/pps-api.interface';
import { PPSApi } from './pps/third-party/pps-api';
import { IPPSApiResponseAuthenticationMetaDataExtractorSymbol } from './pps/domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor.interface';
import { PPSApiResponseAuthenticationMetaDataExtractor } from './pps/domain/authentication-metadata-extractor/pps-api-response-authentication-metadata-extractor';
import { KeepAliveController } from './keep-alive/keep-alive.controller';
import { IRecaptchaCheckerSymbol } from '@pps-easy/recaptcha/contracts';
import { GoogleRecaptchaChecker, LocalRecaptchaChecker } from '@pps-easy/recaptcha/google';
import * as process from 'node:process';
import { RecaptchaController } from './recpatcha/recaptcha.controller';
import { RecaptchaGuard } from './guards/recaptcha.guard';

const isLocalEnvironment = process.env.ENVIRONMENT;

@Module({
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({
        rejectUnauthorized: false
      }),
    }),
  ],
  controllers: [GenerateController, KeepAliveController, RecaptchaController],
  providers: [
    { provide: IPPSGenerateUseCaseSymbol, useClass: PPSGeneratorUseCase },
    { provide: IPPSApiSymbol, useClass: PPSApi, scope: Scope.REQUEST },
    {
      provide: IPPSApiResponseAuthenticationMetaDataExtractorSymbol,
      useClass: PPSApiResponseAuthenticationMetaDataExtractor,
      scope: Scope.REQUEST,
    },
    {
      provide: IHtmlParserSymbol,
      useClass: HtmlParser,
    },
    {
      provide: IRecaptchaCheckerSymbol,
      useValue: isLocalEnvironment ?
        new LocalRecaptchaChecker() :
        new GoogleRecaptchaChecker(process.env.RECAPTCHA_SITE_KEY || '', process.env.FIREBASE_PROJECT_ID || '')
    },
    RecaptchaGuard
  ],
})
export class AppModule implements OnModuleInit {
  constructor(private httpService: HttpService) {}

  onModuleInit() {
    // Add request and response interceptors
    this.httpService.axiosRef.interceptors.request.use(
      (config) => {
        // Log request details
        console.log('Request:', {
          url: config.url,
          method: config.method,
          headers: config.headers,
          params: config.params,
          data: config.data,
        });
        return config;
      },
      error => {
        // Log error if any during request setup
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    this.httpService.axiosRef.interceptors.response.use(
      response => {
        // Log response details
        console.log('Response:', {
          status: response.status,
          data: response.data,
        });
        return response;
      },
      error => {
        // Log response error details
        console.error('Response error:', {
          status: error.response?.status,
          data: error.response?.data,
        });
        return Promise.reject(error);
      }
    );
  }
}

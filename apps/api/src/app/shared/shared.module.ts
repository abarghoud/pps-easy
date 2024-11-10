import { Module, OnModuleInit } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { Agent } from 'https';
import { IHtmlParserSymbol } from '@easy-pps/html-parser/contracts';
import { HtmlParser } from '@easy-pps';
import { IRecaptchaCheckerSymbol } from '@pps-easy/recaptcha/contracts';
import { GoogleRecaptchaChecker, LocalRecaptchaChecker } from '@pps-easy/recaptcha/google';
import process from 'node:process';
import { RecaptchaGuard } from '../guards/recaptcha.guard';

const isLocalEnvironment = process.env.ENVIRONMENT === 'local';

@Module({
  exports: [
    HttpModule,
    IHtmlParserSymbol,
    IRecaptchaCheckerSymbol,
  ],
  imports: [
    HttpModule.register({
      httpsAgent: new Agent({
        rejectUnauthorized: false
      }),
    }),
  ],
  providers: [
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
  ]
})
export class SharedModule implements OnModuleInit {
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

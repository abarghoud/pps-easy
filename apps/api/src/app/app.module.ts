import { Module } from '@nestjs/common';

import { GenerateController } from './generate.controller';
import { KeepAliveController } from './keep-alive/keep-alive.controller';
import { RecaptchaController } from './recpatcha/recaptcha.controller';
import { PPSModule } from './pps/pps.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    SharedModule,
    PPSModule,
  ],
  controllers: [GenerateController, KeepAliveController, RecaptchaController],
})
export class AppModule {}

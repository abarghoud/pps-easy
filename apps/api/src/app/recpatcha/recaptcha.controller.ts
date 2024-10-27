import { Body, Controller, Inject, Post } from '@nestjs/common';

import { ChallengeResult, IRecaptchaChecker, IRecaptchaCheckerSymbol } from '@pps-easy/recaptcha/contracts';

import { RecaptchaDto } from './recaptcha.dto';

@Controller('/recaptcha')
export class RecaptchaController {
  constructor(@Inject(IRecaptchaCheckerSymbol) private readonly recaptchaChecker: IRecaptchaChecker) {}

  @Post('/check')
  public check(@Body() recaptchaDto: RecaptchaDto): Promise<ChallengeResult> {
    return this.recaptchaChecker.check(recaptchaDto.token);
  }
}

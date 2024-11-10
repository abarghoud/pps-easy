import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';

import { PPSGeneratorUseCase } from './pps/usecase/pps-generator-usecase.service';
import { PPSProfileDto } from './pps/domain/pps-profile-dto.model';
import { IPPSGenerateUseCaseSymbol } from './pps/usecase/pps-generate-usecase.interface';
import { RecaptchaGuard } from './guards/recaptcha.guard';

@Controller('/pps')
export class GenerateController {
  constructor(@Inject(IPPSGenerateUseCaseSymbol) private readonly ppsGeneratorUseCase: PPSGeneratorUseCase) {}

  @Post('/generate')
  @UseGuards(RecaptchaGuard)
  public generate(@Body() ppsProfileDto: PPSProfileDto): Promise<string> {
    console.log(ppsProfileDto);

    return this.ppsGeneratorUseCase.generate();
  }
}

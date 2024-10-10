import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { PPSGeneratorUseCase } from './pps/usecase/pps-generator-usecase.service';
import { PPSProfileDto } from './pps/domain/pps-profile-dto.model';
import { IPPSGenerateUseCaseSymbol } from './pps/usecase/pps-generate-usecase.interface';
import { PPSId } from './pps/domain/pps-id.type';

@Controller('/pps')
export class GenerateController {
  constructor(@Inject(IPPSGenerateUseCaseSymbol) private readonly ppsGeneratorUseCase: PPSGeneratorUseCase) {}

  @Post('/generate')
  public generate(@Body() ppsProfileDto: PPSProfileDto): Promise<string> {
    try {
      return this.ppsGeneratorUseCase.generate(ppsProfileDto);
    } catch (error) {
      console.log(error);
    }

  }
}

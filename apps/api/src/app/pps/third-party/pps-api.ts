import { Inject, Injectable } from '@nestjs/common';

import { IPPSApi } from './pps-api.interface';
import { IPPSStep, IPPSStepListSymbol } from './journey-steps/pps-step.interface';

export class EmptyStepsArrayError extends Error {}

export class InvalidStepsError extends Error {}

@Injectable()
export class PPSApi implements IPPSApi {
  public constructor(@Inject(IPPSStepListSymbol) readonly ppsSteps: IPPSStep[]) {}

  public async run(): Promise<string> {
    if (!this.ppsSteps.length) {
      throw new EmptyStepsArrayError();
    }

    let result: string | void;

    for (const step of this.ppsSteps) {
      result = await step.doStep();
    }

    if (!result) {
      throw new InvalidStepsError();
    }

    return result;
  }
}

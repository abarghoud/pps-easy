import { Inject, Injectable } from '@nestjs/common';

import { IPPSGenerateUseCase } from './pps-generate-usecase.interface';
import { PPSId } from '../domain/pps-id.type';
import { IPPSApi, IPPSApiSymbol } from '../third-party/pps-api.interface';

@Injectable()
export class PPSGeneratorUseCase implements IPPSGenerateUseCase {
  public constructor(@Inject(IPPSApiSymbol) private readonly ppsApi: IPPSApi) {
  }

  public async generate(): Promise<PPSId> {
    return await this.ppsApi.run();
  }
}

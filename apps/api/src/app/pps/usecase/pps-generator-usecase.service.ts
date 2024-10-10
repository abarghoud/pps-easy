import { Inject, Injectable } from '@nestjs/common';

import { IPPSGenerateUseCase } from './pps-generate-usecase.interface';
import { PPSProfileDto } from '../domain/pps-profile-dto.model';
import { IPPSApi, IPPSApiSymbol } from '../third-party/pps-api.interface';
import { PPSId } from '../domain/pps-id.type';

@Injectable()
export class PPSGeneratorUseCase implements IPPSGenerateUseCase {
  public constructor(@Inject(IPPSApiSymbol) private readonly ppsApi: IPPSApi) {
  }

  public async generate(ppsProfileDto: PPSProfileDto): Promise<PPSId> {
    await this.ppsApi.init(ppsProfileDto);
    await this.ppsApi.createProfile();

    return await this.ppsApi.finalize();
  }
}

import { PPSProfileDto } from '../domain/pps-profile-dto.model';
import { PPSId } from '../domain/pps-id.type';

export const IPPSGenerateUseCaseSymbol = Symbol.for('IPPSGenerateUseCase');

export interface IPPSGenerateUseCase {
  generate(ppsProfileDto: PPSProfileDto): Promise<PPSId>;
}

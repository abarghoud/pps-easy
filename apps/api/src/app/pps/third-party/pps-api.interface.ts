import { PPSProfileDto } from '../domain/pps-profile-dto.model';

export const IPPSApiSymbol = Symbol.for('IPPSApi');

export interface IPPSApi {
  init(ppsProfileDto: PPSProfileDto): Promise<void>;
  createProfile(): Promise<void>;
  finalize(): Promise<string>;
}

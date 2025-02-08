import { Gender } from '@pps-easy/user/domain';

export interface GeneratePPSPayload {
  birthday: string;
  email: string;
  event_date: string;
  firstname: string;
  gender: Gender;
  lastname: string;
}

export interface IPPSCertificateApiService {
  generate(payload: GeneratePPSPayload): Promise<string>;
}

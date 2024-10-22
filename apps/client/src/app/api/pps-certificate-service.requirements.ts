export interface GeneratePPSPayload {
  birthday: string;
  email: string;
  event_date: string;
  firstname: string;
  gender: 'male' | 'female';
  lastname: string;
}

export interface IPPSCertificateService {
  generate: (payload: GeneratePPSPayload) => Promise<string>;
}

import React from 'react';

import {
  GeneratePPSPayload,
  IPPSCertificateApiService,
} from '../api/pps-certificate-service.requirements';

class NullPPSCertificateApiService implements IPPSCertificateApiService {
  public generate(payload: GeneratePPSPayload): Promise<string> {
    return Promise.resolve('');
  };
}

export const PPSCertificateApiContext = React.createContext<IPPSCertificateApiService>(new NullPPSCertificateApiService());

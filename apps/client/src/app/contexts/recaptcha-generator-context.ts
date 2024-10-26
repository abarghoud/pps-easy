import React from 'react';

import { IRecaptchaGenerator } from '@pps-easy/recaptcha/contracts';

class NullRecaptchaGenerator implements IRecaptchaGenerator {
  public async generate(): Promise<string> {
    return '';
  }
}

export const RecaptchaGeneratorContext = React.createContext<IRecaptchaGenerator>(new NullRecaptchaGenerator());

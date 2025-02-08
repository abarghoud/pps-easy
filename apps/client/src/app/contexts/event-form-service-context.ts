/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

import { IEventFormService } from '../service/event-form-service.requirements';
import { EventFormValues } from '../schema/event-form-schema';
import { UserPersonalInfoEntity } from '@pps-easy/user/domain';

class NullEventFormService implements IEventFormService {
  public async getSavedPersonalInfo(): Promise<
    UserPersonalInfoEntity | Partial<UserPersonalInfoEntity>
  > {
    return {};
  }

  public submitForm(values: EventFormValues): Promise<string> {
    return Promise.resolve('');
  }

  public handleSuccess(response: string): void {}

  public handleError(error: unknown): void {}
}

export const EventFormServiceContext = React.createContext<IEventFormService>(new NullEventFormService());


import { UserPersonalInfoEntity } from '@pps-easy/user/domain';

import { EventFormValues } from '../schema/event-form-schema';

export interface IEventFormService {
  getSavedPersonalInfo(): Promise<UserPersonalInfoEntity | Partial<UserPersonalInfoEntity>>
  submitForm(values: EventFormValues): Promise<string>;
  handleSuccess(response: string): void;
  handleError(error: unknown): void;
}

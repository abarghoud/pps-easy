import { FormValues } from '../schema/event-form-schema';

export interface IEventFormService {
  submitForm(values: FormValues): Promise<string>;
  handleSuccess(response: string): void;
  handleError(error: unknown): void;
}

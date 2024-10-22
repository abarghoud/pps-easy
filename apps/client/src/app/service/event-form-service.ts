import { IEventFormService } from './event-form-service.requirements';
import { IPPSCertificateService } from '../api/pps-certificate-service.requirements';
import { FormValues } from '../schema/event-form-schema';
import { formatToISODate } from '../utils/validators';

export class EventFormService implements IEventFormService {
  private api: IPPSCertificateService;

  constructor(api: IPPSCertificateService) {
    this.api = api;
  }

  public async submitForm(values: FormValues): Promise<string> {
    const payload = this.transformFormValuesToRequestPayload(values);

    try {
      const response = await this.api.generate({
        ...payload,
        gender: payload.gender as 'male' | 'female',
      });

      return response;

    } catch (error) {
      throw new Error('Unsuccessful form submission: ' + (error instanceof Error ? error.message : 'Unknown error'));
    }
  }

  public handleSuccess(response: string) {
    const resultWindow = window.open('');
    if (resultWindow) {
      resultWindow.document.open();
      resultWindow.document.write(response);
      resultWindow.document.close();
    }
  }

  public handleError(error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unexpected error has occurred.');
    }
  }

  private transformFormValuesToRequestPayload(values: FormValues) {
    return {
      birthday: formatToISODate(values.birthday),
      email: values.email,
      event_date: formatToISODate(values.eventDate),
      firstname: values.firstname,
      gender: values.gender === 'homme' ? 'male' : 'female',
      lastname: values.lastname,
    };
  }
}

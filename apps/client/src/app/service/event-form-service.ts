import { UserPersonalInfoEntity } from '@pps-easy/user/domain';
import { IUserPersonalInfoRepository } from '@pps-easy/user/contracts';

import { IEventFormService } from './event-form-service.requirements';
import { IPPSCertificateApiService } from '../api/pps-certificate-service.requirements';
import { EventFormValues } from '../schema/event-form-schema';

export class EventFormService implements IEventFormService {
  constructor(
    private readonly ppsCertificateApi: IPPSCertificateApiService,
    private readonly userPersonalInfoRepository: IUserPersonalInfoRepository
  ) {}

  public async submitForm(values: EventFormValues): Promise<string> {
    const payload = this.transformFormValuesToRequestPayload(values);

    try {
      const response = await this.ppsCertificateApi.generate(payload);

      if (values.saveForLaterUse) {
        await this.userPersonalInfoRepository.persist(
          new UserPersonalInfoEntity(
            payload.firstname,
            payload.lastname,
            payload.email,
            payload.birthday,
            payload.gender
          )
        );
      }

      return response;
    } catch (error) {
      throw new Error(
        'Unsuccessful form submission: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      );
    }
  }

  public async getSavedPersonalInfo(): Promise<UserPersonalInfoEntity | Partial<UserPersonalInfoEntity>> {
    const savedPersonalInfo =
      await this.userPersonalInfoRepository.getPersonalInfo();

    if (!savedPersonalInfo) {
      return {
        firstname: undefined,
        lastname: undefined,
        email: undefined,
        birthday: undefined,
        gender: undefined,
      };
    }

    return savedPersonalInfo;
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

  private transformFormValuesToRequestPayload(values: EventFormValues) {
    return {
      birthday: values.birthday,
      email: values.email,
      event_date: values.eventDate,
      firstname: values.firstname,
      gender: values.gender,
      lastname: values.lastname,
    };
  }
}

import { FC, useCallback, useContext, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, FormValues } from '../../schema/event-form-schema';
import { EventForm } from './EventForm';
import { EventFormService } from '../../service/event-form-service';
import { PPSCertificateApiContext } from '../../contexts/pps-certificate-api-context';

export const EventFormPage: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formValues = useForm<FormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      birthday: '',
      eventDate: '',
      email: '',
      firstname: '',
      lastname: '',
      gender: undefined,
      saveForLaterUse: false,
    },
  });
  const ppsGenerateAPI = useContext(PPSCertificateApiContext);
  const eventFormService = useMemo(() => new EventFormService(ppsGenerateAPI), [ppsGenerateAPI]);

  const onSubmit = useCallback(async (values: FormValues) => {
    debugger;
    setIsSubmitting(true);

    try {
      const response = await eventFormService.submitForm(values);
      eventFormService.handleSuccess(response);
      formValues.reset({
        birthday: '',
        eventDate: '',
        email: '',
        firstname: '',
        lastname: '',
        gender: undefined,
        saveForLaterUse: false,
      });
    } catch (error) {
      eventFormService.handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [eventFormService, formValues]);


  return (
    <EventForm
      formMethods={formValues}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

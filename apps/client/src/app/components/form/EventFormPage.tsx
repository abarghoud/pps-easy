import { FC, useCallback, useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, FormValues } from '../../schema/event-form-schema';
import { EventForm } from './EventForm';
import { EventFormService } from '../../service/event-form-service';
import { PPSCertificateService } from '../../api/pps-certificate-service';
import { RecaptchaGeneratorContext } from '../../contexts/recaptcha-generator-context';

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
    },
  });
  const recaptchaGenerator = useContext(RecaptchaGeneratorContext);

  const onSubmit = useCallback(async (values: FormValues) => {
    const ppsGenerateAPI = new PPSCertificateService(recaptchaGenerator);
    const eventFormService = new EventFormService(ppsGenerateAPI);

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
      });
    } catch (error) {
      eventFormService.handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  }, [formValues, recaptchaGenerator]);


  return (
    <EventForm
      formMethods={formValues}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

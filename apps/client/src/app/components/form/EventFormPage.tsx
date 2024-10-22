import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, FormValues } from '../../schema/event-form-schema';
import { EventForm } from './EventForm';
import { EventFormService } from '../../service/event-form-service';
import { PPSCertificateService } from '../../api/pps-certificate-service';

export const EventFormPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ppsGenerateAPI = new PPSCertificateService();
  const eventFormService = new EventFormService(ppsGenerateAPI);

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

  const onSubmit = async (values: FormValues) => {
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
  };


  return (
    <EventForm
      formMethods={formValues}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
};

import { FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  eventFormSchema,
  EventFormValues,
} from '../../schema/event-form-schema';
import { EventForm } from './EventForm';
import { EventFormServiceContext } from '../../contexts/event-form-service-context';
import { useAuth } from '../../hooks/useAuth';

export const EventFormPage: FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const eventFormService = useContext(EventFormServiceContext);
  const { user } = useAuth();

  const form = useForm<EventFormValues>({
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
  const { dirtyFields } = form.formState;

  const isPersonalInfoFieldsDirty = useMemo(() => {
    return dirtyFields.gender ||
      dirtyFields.birthday ||
      dirtyFields.email ||
      dirtyFields.firstname ||
      dirtyFields.lastname;
  }, [
    dirtyFields.gender,
    dirtyFields.birthday,
    dirtyFields.email,
    dirtyFields.firstname,
    dirtyFields.lastname
  ]);

  const onSubmit = useCallback(
    async (values: EventFormValues) => {
      setIsSubmitting(true);

      try {
        const response = await eventFormService.submitForm(values);
        eventFormService.handleSuccess(response);
        form.reset({
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
    },
    [eventFormService, form]
  );

  useEffect(() => {
    eventFormService.getSavedPersonalInfo().then((savedPersonalInfo) => {
      form.reset(savedPersonalInfo);
    });
  }, [eventFormService, form]);

  return (
    <EventForm
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
      shouldDisplaySaveForLaterUseField={isPersonalInfoFieldsDirty && !!user}
    />
  );
};

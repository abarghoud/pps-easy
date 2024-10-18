import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, FormValues } from '../../schema/event-form-schema';
import { formatToISODate } from '../../utils/validators';
import { Card, CardContent, CardHeader, CardTitle } from '@pps-easy/ui/card';
import { Button } from '@pps-easy/ui/button';
import { Form } from '@pps-easy/ui/form';
import { Loader2 } from "lucide-react"
import { InputField, SelectField } from './Fields';
import { PPSGenerateAPI } from '../../api/pps-generate-api';

export const EventForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<FormValues>({
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

  const transformFormValuesToAPIPayload = useCallback((values: FormValues) => ({
    birthday: formatToISODate(values.birthday),
    email: values.email,
    event_date: formatToISODate(values.eventDate),
    firstname: values.firstname,
    gender: values.gender === 'homme' ? 'male' : 'female',
    lastname: values.lastname,
  }),
    [],
  );

  const handleError = (error: unknown) => {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Une erreur inattendue est survenue.');
    }
  };

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    const payload = transformFormValuesToAPIPayload(values);
    try {
      const response = await PPSGenerateAPI.generate({
        ...payload,
        gender: payload.gender as "male" | "female"
      });
      handleSuccess(response);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccess = (response: string) => {
    const resultWindow = window.open('');
    resultWindow?.document.write(response);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">PPS Easy</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                control={form.control}
                isDateField
                label="Date de naissance"
                name="birthday"
                placeholder="JJ/MM/AAAA"
              />
              <InputField
                control={form.control}
                isDateField
                label="Date de l'événement"
                name="eventDate"
                placeholder="JJ/MM/AAAA"
              />
              <InputField
                control={form.control}
                label="Email"
                name="email"
                placeholder="votre@email.com"
              />
              <InputField
                control={form.control}
                label="Prénom"
                name="firstname"
                placeholder="Prénom"
              />
              <InputField
                control={form.control}
                label="Nom"
                name="lastname"
                placeholder="Nom"
              />
              <SelectField
                control={form.control}
                label="Genre"
                name="gender"
                options={[
                  { value: 'homme', label: 'Homme' },
                  { value: 'femme', label: 'Femme' },
                ]}
                placeholder="Sélectionnez votre genre"
              />
            </div>

            <Button className="w-full" type="submit" isLoading={isSubmitting}>
              Générer votre certificat
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

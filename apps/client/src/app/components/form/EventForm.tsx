import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventFormSchema, FormValues } from '../../schema/event-form-schema';
import { formatToISODate } from '../../utils/validators';
import { Card, CardContent, CardHeader, CardTitle } from '@pps-easy/ui/card';
import { Button } from '@pps-easy/ui/button';
import { Form } from '@pps-easy/ui/form';
import { InputField, SelectField } from './Fields';

export const EventForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      birthday: "",
      eventDate: "",
      email: "",
      firstname: "",
      lastname: "",
      gender: undefined,
    },
  });

  const onSubmit = (values: FormValues) => {
    const formattedData = {
      birthday: formatToISODate(values.birthday),
      event_date: formatToISODate(values.eventDate),
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      gender: values.gender,
    };

    console.log(formattedData);
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
                options={[{ value: "homme", label: "Homme" }, { value: "femme", label: "Femme" }]}
                placeholder="Sélectionnez votre genre"
              />

            </div>

            <Button className="w-full" type="submit">
              Générer votre certificat
            </Button>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

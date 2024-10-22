import React from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@pps-easy/ui/card';
import { Button } from '@pps-easy/ui/button';
import { InputField, SelectField } from './Fields';
import { FormValues } from '../../schema/event-form-schema';

interface EventFormProps {
  formMethods: UseFormReturn<FormValues>;
  isSubmitting: boolean;
  onSubmit: (data: FormValues) => void;
}

export const EventForm: React.FC<EventFormProps> = ({
  formMethods,
  isSubmitting,
  onSubmit
}) => {
  return (
    <FormProvider {...formMethods}>
      <Card className="w-full max-w-2xl mx-auto min-h-[595px] flex flex-col justify-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">PPS Easy</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                control={formMethods.control}
                isDateField
                label="Date de naissance"
                name="birthday"
                placeholder="JJ/MM/AAAA"
              />
              <InputField
                control={formMethods.control}
                isDateField
                label="Date de l'événement"
                name="eventDate"
                placeholder="JJ/MM/AAAA"
              />
              <InputField
                control={formMethods.control}
                label="Email"
                name="email"
                placeholder="votre@email.com"
              />
              <InputField
                control={formMethods.control}
                label="Prénom"
                name="firstname"
                placeholder="Prénom"
              />
              <InputField
                control={formMethods.control}
                label="Nom"
                name="lastname"
                placeholder="Nom"
              />
              <SelectField
                control={formMethods.control}
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
        </CardContent>
      </Card>
    </FormProvider>
  );
};

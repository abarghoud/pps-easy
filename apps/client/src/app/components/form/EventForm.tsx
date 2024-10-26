import { FC } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@pps-easy/ui/card';
import { Button } from '@pps-easy/ui/button';
import { EventFormInputField, EventFormSelectField } from './EventFormFields';
import { FormValues } from '../../schema/event-form-schema';

interface EventFormProps {
  formMethods: UseFormReturn<FormValues>;
  isSubmitting: boolean;
  onSubmit: (data: FormValues) => void;
}

export const EventForm: FC<EventFormProps> = ({
  formMethods,
  isSubmitting,
  onSubmit
}) => {
  return (
    <FormProvider {...formMethods}>
      <Card className="w-full max-w-4xl mx-auto min-h-[595px] flex flex-col p-6 bg-card rounded-lg shadow-2xl border-2 border-border overflow-auto">
        <CardHeader className='mb-8'>
          <CardTitle className="text-3xl font-bold text-center text-primary">PPS Easy - Nouveau Certificat</CardTitle>
        </CardHeader>
        <CardContent className="text-foreground mt-8">
          <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-6 flex-grow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EventFormInputField
                control={formMethods.control}
                isDateField
                label="Date de naissance"
                name="birthday"
                placeholder="JJ/MM/AAAA"
              />
              <EventFormInputField
                control={formMethods.control}
                isDateField
                label="Date de l'événement"
                name="eventDate"
                placeholder="JJ/MM/AAAA"
              />
              <EventFormInputField
                control={formMethods.control}
                label="Email"
                name="email"
                placeholder="votre@email.com"
              />
              <EventFormInputField
                control={formMethods.control}
                label="Prénom"
                name="firstname"
                placeholder="Prénom"
              />
              <EventFormInputField
                control={formMethods.control}
                label="Nom"
                name="lastname"
                placeholder="Nom"
              />
              <EventFormSelectField
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
            <Button className="w-full bg-primary text-white" type="submit" isLoading={isSubmitting}>
              Générer votre certificat
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

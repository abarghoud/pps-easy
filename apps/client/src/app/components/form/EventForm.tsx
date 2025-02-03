import React, { FC, useMemo } from 'react';
import { FormProvider, UseFormReturn } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@pps-easy/ui/card';
import { Button } from '@pps-easy/ui/button';
import { EventFormInputField, EventFormSelectField } from './EventFormFields';
import { EventFormValues } from '../../schema/event-form-schema';
import { addMonths, format } from 'date-fns';
import { Checkbox } from '@pps-easy/ui/checkbox';
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from '@pps-easy/ui/form';
import { Gender } from '@pps-easy/user/domain';

interface EventFormProps {
  form: UseFormReturn<EventFormValues>;
  isSubmitting: boolean;
  onSubmit: (data: EventFormValues) => void;
  shouldDisplaySaveForLaterUseField: boolean | undefined;
}

export const EventForm: FC<EventFormProps> = ({
  form,
  isSubmitting,
  onSubmit,
  shouldDisplaySaveForLaterUseField,
}) => {
  const today = new Date();
  const minRaceDate = format(today, 'yyyy-MM-dd');
  const maxRaceDate = format(addMonths(today, 3), 'yyyy-MM-dd');

  return (
    <FormProvider {...form}>
      <Card
        className="w-full max-w-4xl mx-auto min-h-[595px] flex flex-col p-6 bg-card rounded-lg shadow-2xl border-2 border-border overflow-auto">
        <CardHeader className="mb-8">
          <CardTitle className="text-3xl font-bold text-center text-primary">
            PPS Easy - Nouveau Certificat
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground mt-8">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 flex-grow"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EventFormInputField
                control={form.control}
                type="date"
                label="Date de naissance"
                name="birthday"
                placeholder="JJ/MM/AAAA"
              />
              <EventFormInputField
                control={form.control}
                type="date"
                label="Date de la course"
                max={maxRaceDate}
                min={minRaceDate}
                name="eventDate"
                placeholder="JJ/MM/AAAA"
              />
              <EventFormInputField
                control={form.control}
                label="Email"
                name="email"
                placeholder="votre@email.com"
              />
              <EventFormInputField
                control={form.control}
                label="Prénom"
                name="firstname"
                placeholder="Prénom"
              />
              <EventFormInputField
                control={form.control}
                label="Nom"
                name="lastname"
                placeholder="Nom"
              />
              <EventFormSelectField
                control={form.control}
                label="Genre"
                name="gender"
                options={[
                  { value: Gender.male, label: 'Homme' },
                  { value: Gender.female, label: 'Femme' }
                ]}
                placeholder="Sélectionnez votre genre"
              />

              {
                shouldDisplaySaveForLaterUseField ?
                  <FormField
                    control={form.control}
                    name="saveForLaterUse"
                    render={({ field }) => (
                      <FormItem
                        className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow col-span-1 md:col-span-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Sauvegarder mes informations pour la prochaine fois
                          </FormLabel>
                          <FormDescription>
                            À la prochaine connexion, vos informations seront pré-remplies, vous n'aurez qu'à remplir la
                            date de la course.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  /> :
                  null
              }
            </div>
            <Button
              className="w-full bg-primary text-white"
              type="submit"
              isLoading={isSubmitting}
            >
              Générer votre certificat
            </Button>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  );
};

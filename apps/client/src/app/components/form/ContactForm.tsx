import { FC, useCallback, useContext } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Button } from '@pps-easy/ui/button';

import { IContactFormApi } from '../../api/contact-form-api.requirements';
import { ContactFormApiServiceContext } from '../../contexts/contact-form-api-context';

interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: FC = () => {
  const { control, handleSubmit, formState: { isSubmitting }, reset } = useForm<ContactFormValues>();
  const contactFormApiService = useContext<IContactFormApi>(ContactFormApiServiceContext);

  const onSubmit = useCallback(
    async ({ email, name, message }: ContactFormValues) => {
      try {
        await contactFormApiService.saveContact(email, name, message);
        alert(
          'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
        );
        reset();
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    [contactFormApiService, reset]
  );

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[595px] flex flex-col gap-2 p-6 bg-card rounded-lg shadow-md border border-border overflow-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Contactez-nous</h2>
      <p className="mb-2 text-muted-foreground">
        Pour toute question, commentaire ou demande d'assistance, n'hésitez pas à nous contacter.
        Nous sommes là pour vous aider et nous nous engageons à répondre dans les plus brefs délais.
      </p>

      <h3 className="text-lg font-semibold mt-4 text-primary">Formulaire de contact</h3>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Votre nom"
              className="w-full p-2 text-foreground bg-transparent border border-border rounded"
              required
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="Votre email"
              className="w-full p-2 text-foreground bg-transparent border border-border rounded"
              required
            />
          )}
        />
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <textarea
              {...field}
              placeholder="Votre message"
              className="w-full p-2 text-foreground bg-transparent border border-border rounded"
              rows={4}
              required
            />
          )}
        />
        <Button className="w-full bg-primary text-white" type="submit" isLoading={isSubmitting}>
          Envoyer
        </Button>
      </form>

      <h3 className="text-lg font-semibold mt-4 text-primary">Suivez-nous</h3>
      <p className="text-muted-foreground">
        Restez à jour avec nos dernières nouvelles et mises à jour en nous suivant sur nos réseaux sociaux.
        Nous sommes présents sur <a href="https://github.com/abarghoud/pps-easy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Github</a> et d'autres plateformes.
      </p>

      <p className="mt-6 text-sm text-muted-foreground">
        Merci de votre intérêt pour PPS Easy. Nous sommes impatients de vous entendre !
      </p>
    </div>
  );
};

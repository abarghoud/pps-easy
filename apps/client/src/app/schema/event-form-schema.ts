import * as z from 'zod';
import { isValidEmail } from '../utils/validators';
import { addMonths, isAfter, isBefore, startOfDay, subYears } from 'date-fns';

export const eventFormSchema = z.object({
  birthday: z.string().min(1, 'La date de naissance est requise'),
  eventDate: z.string().min(1, "La date de la course est requise").refine((date) => {
    const selectedDate = startOfDay(new Date(date));
    const today = startOfDay(new Date());
    const threeMonthsFromNow = startOfDay(addMonths(today, 3));

    return !isAfter(selectedDate, threeMonthsFromNow) && !isBefore(selectedDate, today);
  }, 'La date de la course doit être dans les 3 mois à venir'),
  email: z.string().refine(isValidEmail, {
    message: "Veuillez entrer une adresse email valide.",
  }),
  firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  gender: z.enum(["homme", "femme"], { required_error: "Veuillez sélectionner un genre." }),
}).refine((schema) => {
  const selectedDate = startOfDay(new Date(schema.birthday));
  const eventDate = startOfDay(new Date(schema.eventDate));
  const eighteenYearsBefore = startOfDay(subYears(eventDate, 18));

  return !isAfter(selectedDate, eighteenYearsBefore);
}, { message: 'Vous devez avoir 18 ans le jour de la course', path: ['birthday'] });

export type FormValues = z.infer<typeof eventFormSchema>;

import * as z from 'zod';
import { isValidEventDate, isValidEmail } from '../utils/validators';

export const eventFormSchema = z.object({
  birthday: z.string().refine(
    (value) => isValidEventDate(value) &&
      new Date(value.split("/").reverse().join("-")) <= new Date() &&
      new Date(value.split("/").reverse().join("-")) >= new Date("1900-01-01"),
    { message: "Veuillez entrer une date de naissance valide au format JJ/MM/AAAA." }
  ),
  eventDate: z.string().refine(
    (value) => isValidEventDate(value) && new Date(value.split("/").reverse().join("-")) >= new Date(),
    { message: "Veuillez entrer une date d'événement valide au format JJ/MM/AAAA jusqu'à 3 mois à venir." }
  ),
  email: z.string().refine(isValidEmail, {
    message: "Veuillez entrer une adresse email valide.",
  }),
  firstname: z.string().min(2, { message: "Le prénom doit contenir au moins 2 caractères." }),
  lastname: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères." }),
  gender: z.enum(["homme", "femme"], { required_error: "Veuillez sélectionner un genre." }),
});

export type FormValues = z.infer<typeof eventFormSchema>;

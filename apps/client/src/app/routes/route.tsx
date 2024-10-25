import { EventFormPage } from "../components/form/EventFormPage";
import { About } from "../components/About";
import { Terms } from "../components/Terms";
import { Privacy } from "../components/Privacy";
import { Contact } from "../components/Contact";
import { ContactForm } from "../components/form/ContactForm";
import { WelcomePage } from "../components/WelcomePage";
import { NotFound } from "../components/NotFound";
import { GuestPage } from "../components/GuestPage";

export const routesConfig = [
  { path: "/", element: <EventFormPage /> },
  { path: "/generate-certificate", element: <GuestPage /> },
  { path: "/about", element: <About /> },
  { path: "/contact-form", element: <ContactForm /> },
  { path: "/contact", element: <Contact /> },
  { path: "*", element: <NotFound /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/welcome", element: <WelcomePage /> },
];

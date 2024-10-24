import { EventFormPage } from "../components/form/EventFormPage";
import { About } from "../components/About";
import { Terms } from "../components/Terms";
import { Privacy } from "../components/Privacy";
import { Contact } from "../components/Contact";
import { ContactForm } from "../components/form/ContactForm";
import { LoginFormPage } from "../components/form/LoginFormPage";
import { WelcomePage } from "../components/WelcomePage";

export const routesConfig = [
  { path: "/", element: <EventFormPage /> },
  { path: "/about", element: <About /> },
  { path: "/contact-form", element: <ContactForm /> },
  { path: "/contact", element: <Contact /> },
  { path: "/login", element: <LoginFormPage /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/terms", element: <Terms /> },
  { path: "/welcome", element: <WelcomePage /> },
];

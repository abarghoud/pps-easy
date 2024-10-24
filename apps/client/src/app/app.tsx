import { Route, Routes } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navbar } from "./components/Navbar";
import { EventFormPage } from "./components/form/EventFormPage";
import { Footer } from "./components/Footer";
import { About } from "./components/About";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";
import { Contact } from "./components/Contact";
import { ContactForm } from "./components/form/ContactForm";
import { NotFound } from "./components/NotFound";
import { useTheme } from "@pps-easy/ui/theme-provider";

export function App() {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" ? "bg-background dark:bg-background" : "bg-white"}`}>
      <Helmet>
        <title>PPS Easy - Home</title>
        <meta name="description" content="PPS Easy - Generate your running certificates easily." />
      </Helmet>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<EventFormPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

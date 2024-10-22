import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { EventFormPage } from "./components/form/EventFormPage";
import { Footer } from "./components/Footer";
import { Certificates } from "./components/Certificates";
import { Account } from "./components/Account";
import { About } from "./components/About";
import { Terms } from "./components/Terms";
import { Privacy } from "./components/Privacy";
import { Contact } from "./components/Contact";

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        <Routes>
          <Route path="/" element={<EventFormPage />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

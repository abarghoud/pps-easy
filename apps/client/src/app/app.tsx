import { Navbar } from "./components/Navbar"
import { EventForm } from "./components/form/EventForm"
import { Footer } from "./components/Footer"

export function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl flex items-center justify-center">
        <EventForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

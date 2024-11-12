import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EventFormPage } from "./form/EventFormPage";

export const GuestPage: FC = () => {
  const navigate = useNavigate();

  const redirectToMainPage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex-grow container mx-auto px-4 py-8 flex flex-col justify-center items-center">
      <EventFormPage />
      <button
        onClick={redirectToMainPage}
        className="mt-4 text-blue-300 hover:underline transition-all text-sm"
      >
        Retour à l'accueil
      </button>
    </div>
  );
}

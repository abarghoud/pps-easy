import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { EventFormPage } from "./form/EventFormPage";

export const GuestPage: FC = () => {
  const navigate = useNavigate();

  const redirectToMainPage = useCallback(() => {
    navigate("/");
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center p-6">
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

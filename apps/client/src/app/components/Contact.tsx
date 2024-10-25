import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const Contact = () => {
  const navigate = useNavigate();

  const redirectToContactForm = useCallback(() => {
    navigate('/contact-form');
  }, [navigate]);

  return (
    <div className="w-full max-w-2xl mx-auto min-h-[595px] flex flex-col p-8 bg-card rounded-lg shadow-md border border-border overflow-auto">
      <h2 className="text-4xl font-bold mb-6 text-primary text-center">Nous Contacter</h2>
      <p className="mb-4 text-foreground text-center">
        Vous avez des questions ou des commentaires ? Notre équipe est là pour vous aider !
        N'hésitez pas à nous faire part de vos préoccupations. Nous nous engageons à vous répondre rapidement.
      </p>

      <h3 className="text-2xl font-semibold mt-6 text-primary">Suivez-Nous</h3>
      <p className="mb-4 text-foreground">
        Restez informé de nos dernières nouvelles et mises à jour en nous suivant sur nos réseaux sociaux.
        Vous pouvez également nous contacter directement en cliquant sur le bouton ci-dessous.
      </p>

      <button
        onClick={redirectToContactForm}
        className="mt-6 w-full py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition duration-200"
      >
        Accéder au Formulaire de Contact
      </button>

      <footer className="mt-8 text-sm text-foreground text-center">
        Merci de votre intérêt pour PPS Easy. Nous sommes impatients de vous entendre !
      </footer>
    </div>
  );
};

import React from 'react';

export const Contact = () => {
  return (
    <div className="w-full max-w-2xl mx-auto min-h-[595px] flex flex-col justify-around p-6 bg-card rounded-lg shadow-md border border-border overflow-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Contactez-nous</h2>
      <p className="mb-2 text-white">
        Pour toute question, commentaire ou demande d'assistance, n'hésitez pas à nous contacter.
        Nous sommes là pour vous aider et nous nous engageons à répondre dans les plus brefs délais.
      </p>

      <h3 className="text-lg font-semibold mt-4 text-primary">Formulaire de contact</h3>
      <p className="mb-4 text-white">
        Alternativement, vous pouvez remplir notre <a href="/contact-form" className="text-primary hover:underline">formulaire de contact</a> en ligne pour nous faire part de vos préoccupations.
      </p>

      <h3 className="text-lg font-semibold mt-4 text-primary">Suivez-nous</h3>
      <p className="text-white">
        Restez à jour avec nos dernières nouvelles et mises à jour en nous suivant sur nos réseaux sociaux.
        Nous sommes présents sur <a href="https://github.com/abarghoud/pps-easy" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Github</a> et d'autres plateformes.
      </p>

      <p className="mt-6 text-sm text-white">
        Merci de votre intérêt pour PPS Easy. Nous sommes impatients de vous entendre !
      </p>
    </div>
  );
};

import React from 'react';

export const Contact = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Contactez-nous</h2>
      <p className="mb-2">
        Pour toute question, commentaire ou demande d'assistance, n'hésitez pas à nous contacter.
        Nous sommes là pour vous aider et nous nous engageons à répondre dans les plus brefs délais.
      </p>
      <h3 className="text-lg font-semibold mt-4">Email</h3>
      <p className="mb-4">
        Vous pouvez nous écrire directement à <a href="mailto:contact@example.com" className="text-primary hover:underline">contact@example.com</a>.
      </p>
      <h3 className="text-lg font-semibold mt-4">Formulaire de contact</h3>
      <p className="mb-4">
        Alternativement, vous pouvez remplir notre <a href="/contact-form" className="text-primary hover:underline">formulaire de contact</a> en ligne pour nous faire part de vos préoccupations.
      </p>
      <h3 className="text-lg font-semibold mt-4">Suivez-nous</h3>
      <p>
        Restez à jour avec nos dernières nouvelles et mises à jour en nous suivant sur nos réseaux sociaux.
        Nous sommes présents sur <a href="https://twitter.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">Twitter</a> et d'autres plateformes.
      </p>
      <p className="mt-6 text-sm text-muted-foreground">
        Merci de votre intérêt pour PPS Easy. Nous sommes impatients de vous entendre !
      </p>
    </div>
  );
};

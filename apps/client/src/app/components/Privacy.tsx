import React from 'react';

export const Privacy = () => {
  return (
    <div className="w-full max-h-[595px] p-6 bg-background text-foreground rounded-lg shadow-lg border border-border overflow-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Politique de confidentialité</h2>
      <p>
        Votre vie privée est importante pour nous. Cette politique explique comment nous collectons, utilisons et protégeons vos informations personnelles lorsque vous utilisez nos services.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">1. Informations que nous collectons</h3>
      <p>
        Nous pouvons collecter des informations personnelles vous concernant lorsque vous vous inscrivez sur notre site,
        utilisez nos services, ou interagissez avec nous. Ces informations peuvent inclure, sans s'y limiter, votre nom,
        adresse e-mail, numéro de téléphone, et toute autre donnée que vous choisissez de nous fournir.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">2. Utilisation de vos informations</h3>
      <p>
        Nous utilisons vos informations personnelles pour :
      </p>
      <ul className="list-disc ml-5 mt-2">
        <li>Fournir et améliorer nos services.</li>
        <li>Communiquer avec vous, y compris pour vous envoyer des mises à jour et des informations sur votre compte.</li>
        <li>Personnaliser votre expérience sur notre site.</li>
        <li>Analyser l'utilisation de nos services pour en améliorer la qualité.</li>
      </ul>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">3. Protection de vos informations</h3>
      <p>
        Nous prenons des mesures raisonnables pour protéger vos informations personnelles contre toute perte,
        utilisation abusive ou accès non autorisé. Cependant, aucune méthode de transmission sur Internet
        ou de stockage électronique n'est totalement sécurisée, et nous ne pouvons garantir la sécurité absolue de vos données.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">4. Partage de vos informations</h3>
      <p>
        Nous ne vendons pas, n'échangeons pas et ne transférons pas vos informations personnelles à des tiers sans votre consentement,
        sauf si cela est nécessaire pour fournir nos services ou si la loi l'exige.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">5. Vos droits</h3>
      <p>
        Vous avez le droit d'accéder à vos informations personnelles, de les corriger, ou de demander leur suppression,
        dans la mesure où la loi l'autorise. Pour exercer ces droits, veuillez nous contacter via notre page de contact.
      </p>

      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">6. Modifications de notre politique de confidentialité</h3>
      <p>
        Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
        Les modifications seront publiées sur cette page et prendront effet immédiatement après leur publication.
        Nous vous encourageons à consulter régulièrement cette politique pour rester informé de nos pratiques en matière de confidentialité.
      </p>

      <p className="mt-6">
        En utilisant nos services, vous acceptez notre politique de confidentialité.
        Si vous avez des questions concernant cette politique, n'hésitez pas à nous contacter.
      </p>
    </div>
  );
};

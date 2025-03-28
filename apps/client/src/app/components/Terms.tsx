import { FC } from 'react';

export const Terms: FC = () => {
  return (
    <div className="w-full max-h-[595px] p-6 bg-background text-foreground rounded-lg shadow-lg border border-border overflow-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Conditions d'utilisation</h2>
      <p>
        En utilisant notre service, vous acceptez nos conditions d'utilisation. Merci de lire attentivement ces termes avant de continuer.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">1. Acceptation des conditions</h3>
      <p>
        En accédant à ce site et en utilisant nos services, vous déclarez avoir lu, compris et accepté ces conditions.
        Si vous n'acceptez pas ces termes, veuillez ne pas utiliser nos services.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">2. Modifications des conditions</h3>
      <p>
        Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment.
        Les changements seront publiés sur cette page et prendront effet immédiatement après leur publication.
        Il est de votre responsabilité de consulter régulièrement ces conditions pour rester informé des éventuelles modifications.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">3. Utilisation des services</h3>
      <p>
        Vous vous engagez à utiliser nos services uniquement à des fins légales et conformément à ces conditions.
        Vous ne devez pas utiliser nos services d'une manière qui pourrait endommager, désactiver, surcharger ou altérer notre site ou interférer avec l'utilisation de celui-ci par d'autres utilisateurs.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">4. Responsabilité</h3>
      <p>
        Nous déclinons toute responsabilité pour les dommages résultant de l'utilisation ou de l'incapacité à utiliser nos services,
        y compris mais sans s'y limiter, les pertes de données ou les dommages directs, indirects, accessoires, consécutifs ou punitifs.
        De plus, nous recommandons fortement aux utilisateurs de suivre un parcours intégral avant d'utiliser nos services et ce afin d'éviter tout
        risque potentiel de blessure ou d'accident. L'utilisation de nos services est à vos propres risques et résulte de votre entière responsabilité.
      </p>
      <h3 className="text-lg font-semibold mt-6 mb-2 text-primary">5. Droit applicable</h3>
      <p>
        Ces conditions sont régies par les lois de votre pays. En cas de litige, vous acceptez de vous soumettre à la compétence exclusive des tribunaux de votre juridiction.
      </p>
      <p className="mt-6">
        Merci de votre compréhension et de votre confiance en PPS Easy. Si vous avez des questions concernant ces conditions,
        n'hésitez pas à nous contacter via notre page de contact.
      </p>
    </div>
  );
};

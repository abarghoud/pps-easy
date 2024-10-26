import { FC } from 'react';
import { CheckCircle } from 'lucide-react';

export const About: FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto min-h-[595px] flex flex-col justify-around p-6 bg-card rounded-lg shadow-md border border-border overflow-auto">
      <h2 className="text-3xl font-bold mb-4 text-primary">Présentation de PPS Easy</h2>
      <p className="text-foreground mb-4">
        PPS Easy est une plateforme conçue pour faciliter l'obtention de certificats PPS pour la course à pied.
        Notre service permet de générer votre certificat en un instant, simplifiant ainsi tout le processus initial.
      </p>
      <h3 className="text-2xl font-semibold mt-6 mb-2 text-primary">Pourquoi choisir PPS Easy ?</h3>
      <ul className="list-disc list-inside text-foreground mb-4">
        <li className="flex items-center">
          <CheckCircle className="text-primary mr-2" /> Génération instantanée de certificats
        </li>
        <li className="flex items-center">
          <CheckCircle className="text-primary mr-2" /> Processus simple et rapide
        </li>
        <li className="flex items-center">
          <CheckCircle className="text-primary mr-2" /> Conçu pour tous les niveaux de coureurs
        </li>
      </ul>
      <p className="text-foreground mb-4">
        Avec PPS Easy, l'obtention de votre certificat se fait en un seul clic.
        Que vous soyez un coureur occasionnel ou un athlète dévoué, notre objectif est de rendre la génération de certificats simple et rapide,
        afin que vous puissiez vous concentrer sur l'essentiel : votre préparation et votre course.
      </p>
    </div>
  );
};

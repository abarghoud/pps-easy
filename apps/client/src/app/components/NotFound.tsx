import { FC } from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '../../assets/NotFoundImage.jpg';

export const NotFound: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full px-6 py-8 bg-background">
      <img src={NotFoundImage} alt="404 Not Found" className="w-[35rem] mb-4 rounded-sm" />
      <h2 className="text-4xl font-bold text-primary mb-2">404 - Page Not Found</h2>
      <p className="text-muted-foreground text-lg mb-4">
        Oups... Il semblerait que vous soyez hors parcours !
      </p>
      <Link to="/" className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md shadow-md">
        Retour à l'accueil
      </Link>
    </div>
  );
};

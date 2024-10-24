import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [resetEmail, setResetEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      await resetPassword(resetEmail);
      setMessage("Email de réinitialisation envoyé !");
      setResetEmail('');
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de l'envoi de l'email de réinitialisation.");
    }
  };

  return (
    <div className="flex flex-col gap-3 mt-4">
      <h3 className="text-white text-lg p-2">Mot de passe oublié ?</h3>
      <input
        type="email"
        placeholder="Entrez votre email"
        value={resetEmail}
        onChange={(e) => setResetEmail(e.target.value)}
        className="border border-gray-600 rounded-md p-2 w-full"
      />
      <button
        onClick={handleResetPassword}
        className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
      >
        Réinitialiser le mot de passe
      </button>
      {message && <p className="text-green-400 mt-2">{message}</p>}
    </div>
  );
};

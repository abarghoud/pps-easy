import React, { useCallback } from "react";
import { Button } from "@pps-easy/ui/button";

interface User {
  email: string;
  firstname: string;
  lastname: string;
}

export const Account: React.FC = () => {
  const user: User = {
    email: "john.doe@example.com",
    firstname: "John",
    lastname: "Doe",
  };

  const handleEditProfile = useCallback(() => {
    console.log("Edit Profile clicked");
  }, []);

  const handleLogout = useCallback(() => {
    console.log("Logout clicked");
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Mon Compte</h2>
      <div className="space-y-2">
        <p><strong>Prénom:</strong> {user.firstname}</p>
        <p><strong>Nom:</strong> {user.lastname}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>
      <div className="mt-4 flex space-x-4">
        <Button onClick={handleEditProfile} variant="default">
          Modifier le Profil
        </Button>
        <Button onClick={handleLogout} variant="secondary">
          Déconnexion
        </Button>
      </div>
    </div>
  );
};

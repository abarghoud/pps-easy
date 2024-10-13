import React, { useEffect, useState } from 'react';

interface Certificate {
  id: number;
  title: string;
  date: string;
  description: string;
}

export const Certificates: React.FC = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const data: Certificate[] = [
          { id: 1, title: "PPS 12DHFGY", date: "2024-01-15", description: "Validé le 15/01/2024" },
          { id: 2, title: "PPS 37FFBH", date: "2024-02-20", description: "Validé le 20/02/2024" },
          { id: 3, title: "PPS 56GJH", date: "2024-03-05", description: "Validé le 05/03/2024" },
        ];

        setCertificates(data);
      } catch (error) {
        setError(`Error loading certificates: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) {
    return <div>Chargement des certificats...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Mes certificats</h2>
      <ul className="space-y-4">
        {certificates.map((certificate) => (
          <li key={certificate.id} className="p-4 border rounded-md shadow">
            <h3 className="font-semibold text-lg">{certificate.title}</h3>
            <p className="text-sm text-gray-600">{certificate.date}</p>
            <p className="mt-2">{certificate.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

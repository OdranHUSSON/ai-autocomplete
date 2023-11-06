// components/ClientSelect.tsx

import { Select } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

interface Client {
  id: string;
  displayName: string;
}

interface ClientSelectProps {
    onClientChange: (clientId: string) => void;
  }

  const ClientSelect: React.FC<ClientSelectProps> = ({ onClientChange }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [selectedClientId, setSelectedClientId] = useState<string>('');

  useEffect(() => {
    const fetchClients = async () => {
      const response = await fetch('/api/invoices/clients/');
      const data = await response.json();
      setClients(data.data);
    };

    fetchClients().catch(console.error);
  }, []);
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClientId(event.target.value);
    onClientChange(event.target.value);
  };

  return (
    <Select placeholder="Select client" onChange={handleSelectChange} value={selectedClientId}>
      {clients.map((client) => (
        !client.isDeleted && (
          <option key={client.id} value={client.id}>
            {client.displayName}
          </option>
        )
      ))}
    </Select>
  );
};

export default ClientSelect;

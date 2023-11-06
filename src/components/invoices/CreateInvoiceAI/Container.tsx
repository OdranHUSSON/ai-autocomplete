import React, { useState } from 'react';
import { Box, Button, Input } from '@chakra-ui/react';
import CreateInvoiceAI from './CreateInvoiceAI'; 

const InvoiceApp = () => {
  const [autocompleteText, setAutocompleteText] = useState('');
  const [showForm, setShowForm] = useState(true);

  const handleAutocompleteChange = (e) => {
    setAutocompleteText(e.target.value);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <Box>
      {showForm ? (
        <>
          <Input
            placeholder="Type to autocomplete..."
            value={autocompleteText}
            onChange={handleAutocompleteChange}
          />
          <Button onClick={toggleForm}>Create Invoice</Button>
        </>
      ) : (
        <CreateInvoiceAI autocompleteText={autocompleteText} />
      )}
    </Box>
  );
};

export default InvoiceApp;

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { InvoiceLineItem } from './LineItem';
import {Loader} from './Loader'
import ClientSelect from './ClientSelect';
import { InvoiceDTO } from '@/models/DTO/invoice';
import PropTypes from 'prop-types';

const CreateInvoiceAI = ({ autocompleteText }) => {
  const toast = useToast();
  const [selectedClientId, setSelectedClientId] = useState('');
  const [invoice, setInvoice] = useState<InvoiceDTO>(getInitialInvoiceState());
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const autofillInvoiceData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/invoices/autocomplete?text=' + encodeURIComponent(autocompleteText));
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('[Autocomplete result]', data.jsonContent)
        setInvoice(data.jsonContent); 
      } catch (error) {
        console.error('Failed to auto-fill invoice data:', error);
        toast({
            title: 'Error',
            description: 'Failed to auto-fill invoice data.',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
      }
      setIsLoading(false);
    };
    autofillInvoiceData();
  }, [autocompleteText, toast]);

  function getInitialInvoiceState(): InvoiceDTO {
    const currentYear = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    return {
      number: `INV-${currentYear}${("0" + month).slice(-2)}00`,
      clientId: '',
      date: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0],
      lineItems: [
        { productKey: '', productNotes: '', quantity: 1, cost: 0 }
      ],
    };
  }

  const handleClientChange = (clientId: string) => {
    setSelectedClientId(clientId);
    setInvoice(prevInvoice => ({
      ...prevInvoice,
      clientId: clientId
    }));
  };

  const addLineItem = () => {
    setInvoice((prevInvoice) => ({
      ...prevInvoice,
      line_items: [...prevInvoice.lineItems, { product_key: '', notes:'', quantity: 1, cost: 0 }],
    }));
  };

  const updateLineItem = (index, key, value) => {
    const newLineItems = [...invoice.lineItems];
    newLineItems[index][key] = value;
    setInvoice({ ...invoice, lineItems: newLineItems });
  };

  const removeLineItem = (index) => {
    const newLineItems = invoice.lineItems.filter((_, i) => i !== index);
    setInvoice({ ...invoice, lineItems: newLineItems });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoice),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      toast({
        title: `Invoice Created`,
        description: "We've created your invoice for you (id : ${result.id} ).",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (error) {
      console.error('Failed to create invoice:', error);
      toast({
        title: 'Error',
        description: 'Failed to create invoice. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={5}>
      {isLoading && <Loader />}
      <VStack spacing={4} align="stretch">
        <FormControl isRequired>
          <FormLabel>Client</FormLabel>
          <ClientSelect onClientChange={handleClientChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Invoice Number</FormLabel>
          <Input
            placeholder="Invoice Number"
            value={invoice.number}
            onChange={(e) => setInvoice({ ...invoice, number: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Invoice Date</FormLabel>
          <Input
            type="date"
            value={invoice.date}
            onChange={(e) => setInvoice({ ...invoice, date: e.target.value })}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Due Date</FormLabel>
          <Input
            type="date"
            value={invoice.dueDate}
            onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
          />
        </FormControl>
        {invoice.lineItems.map((item, index) => (
          <InvoiceLineItem
            key={index}
            item={item}
            onChange={(e, key) => updateLineItem(index, key, e.target.value)}
            onRemove={() => removeLineItem(index)}
          />
        ))}
        <Button leftIcon={<AddIcon />} onClick={addLineItem}>
          Add Line Item
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          Create Invoice
        </Button>
      </VStack>
    </Box>
  );
};

CreateInvoiceAI.propTypes = {
  autocompleteText: PropTypes.string
};

CreateInvoiceAI.defaultProps = {
  autocompleteText: '' 
};

export default CreateInvoiceAI;

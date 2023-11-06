import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ProductForm } from './ProductForm';

export const ProductAutoComplete = () => {
  const [inputText, setInputText] = useState('');
  const [initialValues, setInitialValues] = useState(null);
  const toast = useToast();

  const fetchAndPrefill = async () => {
    try {
      const response = await fetch('/api/autocomplete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          schemaId: 'product',
        }),
      });
      const data = await response.json();

      if (response.ok && data.result) {
        setInitialValues(data.result);
      } else {
        throw new Error(data.message || 'Failed to fetch product data');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSubmit = async (values) => {
    console.log(values);
  };

  return (
    <Box>
      <FormControl>
        <FormLabel htmlFor="autofill">Autofill Data</FormLabel>
        <Input
          id="autofill"
          placeholder="Enter text to autofill"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </FormControl>
      <Button mt={4} onClick={fetchAndPrefill}>
        Autofill Form
      </Button>
      {initialValues && (
        <ProductForm initialValues={initialValues} onSubmit={handleSubmit} />
      )}
    </Box>
  );
};

import React from 'react';
import { Box, Text, VStack, HStack } from '@chakra-ui/react';

const InvoiceLineItem = ({ line }) => {
  return (
    <Box p={4} borderWidth="1px" borderRadius="lg">
      <VStack align="stretch">
        <Text fontWeight="bold">{line.productKey} {line.productNotes}</Text>
        <HStack justify="space-between">
          <Text>Quantity: {line.quantity}</Text>
          <Text>Cost: ${line.cost.toFixed(2)}</Text>
        </HStack>
        <Text>Notes: {line.notes}</Text>
        <HStack justify="space-between">
          <Text>Discount: {line.discount}</Text>
          <Text>Amount Discount: {line.isAmountDiscount ? 'Yes' : 'No'}</Text>
        </HStack>
        <HStack justify="space-between">
          <Text>Line Total: ${line.lineTotal}</Text>
          <Text>Tax Amount: ${line.taxAmount}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default InvoiceLineItem;

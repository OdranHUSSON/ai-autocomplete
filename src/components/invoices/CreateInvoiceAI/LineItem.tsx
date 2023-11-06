import {
    Input,
    HStack,
    IconButton,
  } from '@chakra-ui/react';
  import { DeleteIcon } from '@chakra-ui/icons';

export const InvoiceLineItem = ({ item, onChange, onRemove }) => {
    return (
      <HStack spacing={2}>
        <Input
          placeholder="Quantity"
          type="number"
          value={item.quantity}
          onChange={(e) => onChange(e, 'quantity')}
        />
        <Input
          placeholder="Product Key"
          value={item.productKey}
          onChange={(e) => onChange(e, 'productKey')}
        />
        <Input
          placeholder="Product Notes"
          value={item.productNotes}
          onChange={(e) => onChange(e, 'productNotes')}
        />
        <Input
          placeholder="Cost"
          type="number"
          value={item.cost}
          onChange={(e) => onChange(e, 'cost')}
        />
        <IconButton
          aria-label="Remove line item"
          icon={<DeleteIcon />}
          onClick={onRemove}
        />
      </HStack>
    );
  };
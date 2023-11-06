import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Textarea,
  Button,
  VStack,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema } from '@/models/product';
import { z } from 'zod';

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialValues?: ProductFormData;
  onSubmit: SubmitHandler<ProductFormData>;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialValues, onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues,
  });

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset(initialValues);
    }
  }, [isSubmitSuccessful, reset, initialValues]);

  return (
    <Box>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4}>
        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel htmlFor="name">Product Name</FormLabel>
          <Input id="title" {...register('title')} />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.description)}>
          <FormLabel htmlFor="description">Description</FormLabel>
          <Textarea id="description" {...register('description')} />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.price)}>
          <FormLabel htmlFor="price">Price</FormLabel>
          <NumberInput>
            <NumberInputField id="price" {...register('price', { valueAsNumber: true })} />
          </NumberInput>
          <FormErrorMessage>
            {errors.price && errors.price.message}
          </FormErrorMessage>
        </FormControl>

        <Button mt={4} colorScheme="blue" type="submit">
          Submit
        </Button>
      </VStack>
    </Box>
  );
};

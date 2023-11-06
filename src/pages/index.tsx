// pages/index.tsx

import { ProductAutoComplete } from '@/components/Product/ProductAutocomplete';
import { ProductForm } from '@/components/Product/ProductForm';
import { Container, useColorModeValue} from '@chakra-ui/react';
import React from 'react';



const HomePage: React.FC = () => {
  
  return (
    <Container maxW="container.xl" bg={useColorModeValue('white', 'gray.900')}>
        <ProductAutoComplete />
    </Container>
  );
};

export default HomePage;

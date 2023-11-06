import { Spinner, Center } from '@chakra-ui/react';

export const Loader = () => (
  <Center position="absolute" top="0" right="0" bottom="0" left="0" bg="whiteAlpha.800" zIndex="overlay">
    <Spinner size="xl" />
  </Center>
);

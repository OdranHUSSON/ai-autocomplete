// pages/_app.js
import { Box, ChakraProvider, useColorModeValue } from '@chakra-ui/react'
import theme from '../app/theme';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>          
        <Box bg={useColorModeValue('gray.100', 'gray.900')}>
          <Component {...pageProps} />
        </Box>
      </Box>        
    </ChakraProvider>
  )
}

export default MyApp;
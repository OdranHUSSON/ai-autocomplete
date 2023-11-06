// theme.ts
import { extendTheme, type ThemeConfig } from '@chakra-ui/react'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

const theme = extendTheme({
  config,
  styles: {
    global: (props) => ({
      body: {
        bg: ('gray.100', 'gray.900'),
      }
    })
  },
})

export default theme
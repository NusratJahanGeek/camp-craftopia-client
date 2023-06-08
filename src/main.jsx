import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CSSReset, ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider';

const customTheme = extendTheme({
  fonts: {
    heading: "Caveat, cursive",
    body: "Fredoka, sans-serif",
  },
  components: {
    Button: {
      baseStyle: {
        borderRadius: "4px",
        fontSize: "20px",
        cursor: "pointer",
      },
      variants: {
        solid: {
          bg: "#ff6b6b",
          color: "#fff",
          _hover: {
            bg: "#ff4c4c",
          },
        }
      },
    }
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
  <CSSReset global />
   <HelmetProvider>
   <AuthProvider>
   <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>
   </AuthProvider>
   </HelmetProvider>
 </ChakraProvider>
)

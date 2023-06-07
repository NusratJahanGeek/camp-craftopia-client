import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { CSSReset, ChakraProvider, extendTheme } from '@chakra-ui/react'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes.jsx'

const customTheme = extendTheme({
  fonts: {
    heading: "Caveat, cursive",
    body: "Fredoka, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={customTheme}>
  <CSSReset global />
   <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
 </ChakraProvider>
)

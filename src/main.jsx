import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CSSReset, ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "sweetalert2/dist/sweetalert2.css";

const queryClient = new QueryClient()

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
        fontWeight: "normal",
        cursor: "pointer",
      },
      variants: {
        solid: {
          bg: "#ff6b6b",
          color: "#fff",
          _hover: {
            bg: "#ff4c4c",
          },
        },
      },
      defaultProps: {
        _disabled: {
          opacity: 0.5,
          _hover: {
            bg: "#ff6b6b",
            opacity: 0.5,
          },
        },
      },
    },
  },
});



ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={customTheme}>
    <CSSReset global />
    <React.StrictMode>
      <AuthProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </HelmetProvider>
      </AuthProvider>
    </React.StrictMode>
  </ChakraProvider>
);

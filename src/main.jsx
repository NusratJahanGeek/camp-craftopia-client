import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { CSSReset, ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes.jsx";
import { HelmetProvider } from "react-helmet-async";
import AuthProvider from "./providers/AuthProvider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import "sweetalert2/dist/sweetalert2.css";
import theme from "../theme";

const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
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

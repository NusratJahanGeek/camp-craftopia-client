import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
        light: {
          textColor: "black",
          backgroundColor: "white",
        },
        dark: {
          textColor: "white",
          backgroundColor: "black",
        },
        coral: {
          textColor: "#FF6B6B",
        },
      },
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
    config: {
      initialColorMode: "light", 
      useSystemColorMode: false, 
    },
  });

export default theme;

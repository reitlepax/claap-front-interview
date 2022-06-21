import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      "html, body": {
        height: "100%",
      },
      body: {
        backgroundColor: "gray.800",
      },
      "#root": {
        height: "100%",
      },
    },
  },
  colors: {
    claap: {
      200: "#4C74FF",
      300: "#3864FF",
      400: "#1243F2",
    },
    surfaceBackground: "#272D45",
  },
});

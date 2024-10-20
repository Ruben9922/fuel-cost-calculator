import {ChakraProvider, ColorModeScript} from "@chakra-ui/react";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App.tsx";
import theme from "./theme.ts";
import "@fontsource/lato/400.css";
import "@fontsource/lato/700.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </StrictMode>,
);

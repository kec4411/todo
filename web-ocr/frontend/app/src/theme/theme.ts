import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles:{
        global: {
            body: {
                backgroundColor: "gray.700",
                color: "teal.400",
            }
        }
    }
});

export default theme;
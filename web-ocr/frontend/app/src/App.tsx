import React from 'react';
import { IndexPage } from "./Components/IndexPage";
import {
  ChakraProvider,
} from "@chakra-ui/react";
import theme from "./theme/theme";


function App() {
  return (
      <>
        <header className="App-header">
          <ChakraProvider theme={theme}>
            <IndexPage/>
          </ChakraProvider>
        </header>
      </>
  );
}

export default App;

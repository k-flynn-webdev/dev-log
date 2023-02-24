import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, Box, Container } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import store from './store/store.js'
import App from "./App";

import './style/index.scss';
import './style/index.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
 		<Provider store={store}>
      <ChakraProvider>
        <Box className="dev-diary">
          <Container>
            <App />
          </Container>
        </Box>
	    </ChakraProvider>
    </Provider>
  </React.StrictMode>
);

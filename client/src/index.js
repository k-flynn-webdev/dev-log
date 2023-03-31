import React from "react"
import ReactDOM from "react-dom/client"
import { ChakraProvider, Box, Container } from "@chakra-ui/react"
import { Provider } from "react-redux"
import store from "./store/store.js"
import App from "./App"

import "./style/index.css"
import "./style/index.scss"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <div className="dev-log">
          <App />
        </div>
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
)

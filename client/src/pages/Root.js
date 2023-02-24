import * as React from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider, Box } from '@chakra-ui/react'
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import store from '../store/store.js'

import useDocumentTitle from '../hooks/use-document-title';
import { TITLE } from '../lang/en-gb';


const Root = () => {
	useDocumentTitle(TITLE);

  return (
	<ChakraProvider>
		<Provider store={store}>
			<Box className="dev-diary">
				<Header title={TITLE} />
				<Outlet />
			</Box>
		</Provider>
	</ChakraProvider>
  );
};

export default Root;

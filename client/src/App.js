import * as React from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { Switch, Route } from 'react-router-dom';
import store from './store/store.js'
import Home from './pages/Home';
import Login from './pages/Login';
import useDocumentTitle from './hooks/use-document-title';

import { TITLE } from './lang/en-gb';

function App() {
	useDocumentTitle(TITLE);

	return (
	<ChakraProvider>
		<Box className="dev-diary">
			<h1 className="title text-center my-4 text-5xl">
				{ TITLE }
			</h1>

			<Provider store={store}>
				<main>
					<Switch>
						<Route path="/" component={Home} exact />
						<Route path="/login" component={Login} />
					</Switch>
				</main>
			</Provider>
		</Box>
	</ChakraProvider>
	);
}

export default App;
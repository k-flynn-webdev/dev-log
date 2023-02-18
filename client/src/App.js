import * as React from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import store from './store/store.js'
import Main from './pages/Main';
import useDocumentTitle from './hooks/use-document-title';


const TITLE = 'Dev Diary';


function App() {
	useDocumentTitle(TITLE);

	return (
	<ChakraProvider>
		<Box className="dev-diary">
			<h1 className="title text-center my-4 text-5xl">
				{ TITLE }
			</h1>

			<Provider store={store}>
				<Main />
			</Provider>
		</Box>
	</ChakraProvider>
	);
}

export default App;
import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import Main from './pages/Main';
import useDocumentTitle from './hooks/use-document-title';

const TITLE = 'Dev Diary';


function App() {
	useDocumentTitle(TITLE);

	return (
	<ChakraProvider>
		<Box>
			<h1 className="text-center mt-4 text-5xl">{ TITLE }</h1>
			<Main />
		</Box>
	</ChakraProvider>
	);
}

export default App;
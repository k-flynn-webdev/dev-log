import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import useDocumentTitle from './hooks/use-document-title';
import LogInput from './components/log-input';


const TITLE = 'Dev Diary';

function App() {
	useDocumentTitle(TITLE);

	return (
	<ChakraProvider>
		<div>
			<h1 className="text-center mt-4 text-5xl">{ TITLE }</h1>

			<div>
				<LogInput />
			</div>
		</div>
	</ChakraProvider>
	);
}

export default App;
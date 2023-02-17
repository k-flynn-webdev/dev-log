import * as React from 'react'
import { Container } from '@chakra-ui/react'

import LogInput from '../components/LogInput'
import Logs from '../components/Logs'


function Main() {

	return (
		<Container>
			<LogInput />
			<Logs />
		</Container>
	);
}

export default Main;
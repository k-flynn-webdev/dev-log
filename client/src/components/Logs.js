import * as React from 'react'
import { Box } from '@chakra-ui/react'

import { useSelector } from 'react-redux'

function Logs() {
	const logs = useSelector(state => state.logs)
	const logsList = logs.map((item) => <li key={item.id}>{ item.value }</li>)

	return (
		<Box>
			<ul>
				{logsList}
			</ul>
		</Box>
	)
}

export default Logs;
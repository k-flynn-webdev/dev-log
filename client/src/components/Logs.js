import * as React from 'react'
import { Box } from '@chakra-ui/react'
import Log from './Log'

import { useSelector } from 'react-redux'

function Logs() {
	const logs = useSelector(state => state.logs)
	const LogList = logs.map((item) => <Log key={item.id} value={item} />)

	return (
		<Box>
			{LogList}
		</Box>
	)
}

export default Logs;
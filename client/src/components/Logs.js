import * as React from 'react'
import { Box } from '@chakra-ui/react'
import Log from './Log'

import { getLogs } from '../store/slices/logs'

import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';

function Logs() {
	const dispatch = useDispatch();
	const logs = useSelector(state => state.logs)
	const LogList = logs.map((item) => <Log key={item.id} log={item} />)

	useEffect(() => {
		dispatch(getLogs())
				.unwrap()
	}, [])

	return (
		<Box>
			{LogList}
		</Box>
	)
}

export default Logs;
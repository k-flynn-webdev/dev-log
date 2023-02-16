import * as React from 'react'
import { useState } from 'react'
import { Input, Box, Button } from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { update } from '../store/slices/logInput'

// todo: Make these a function that randomises and encourages
const PLACE_HOLDER = "Todays Milestone?"

function LogInput() {
  const handleChange = (event) => dispatch(update(event.target.value))

	const value = useSelector(state => state.logInput.value)
	const dispatch = useDispatch()

	return (
		<Box>

			<p>{value}</p>

			<Input
				type="text"
				placeholder={PLACE_HOLDER}
				value={value}
        onChange={handleChange}
			/>

		</Box>
	);
}

export default LogInput;
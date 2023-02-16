import * as React from 'react'
import { useState } from 'react'
import { Input, Box, Text, Button } from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { decrease, increase } from '../store/slices/counter'

// todo: Make these a function that randomises and encourages
const PLACE_HOLDER = "Todays Milestone?"

function LogInput() {
  const [value, setValue] = useState('')
  const handleChange = (event) => setValue(event.target.value)

	const count = useSelector(state => state.counter.value)
	const dispatch = useDispatch()

	return (
		<Box>

			<Input
				type="text"
				placeholder={PLACE_HOLDER}
				value={value}
        onChange={handleChange}
			/>

			<div>
					<Button onClick={() => dispatch(increase())}>
						Increase
					</Button>
					<p>{count}</p>
					<Button onClick={() => dispatch(decrease())}>
						Decrease
					</Button>
			</div>

		</Box>
	);
}

export default LogInput;
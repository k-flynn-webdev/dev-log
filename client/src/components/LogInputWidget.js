import * as React from 'react'
import { useState } from 'react'
import { Input, Box } from '@chakra-ui/react'

// todo: Make these a function that randomises and encourages
const PLACE_HOLDER = "Todays Milestone?"

function LogInputWidget({ value }) {
	return (
		<Box>
			<Input
				type="text"
				placeholder={PLACE_HOLDER}
				value={value}
        onChange={handleChange}
			/>
		</Box>
	);
}

export default LogInputWidget;
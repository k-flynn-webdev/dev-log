import * as React from 'react'
import { Input, Box, Button } from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { reset, update } from '../store/slices/log-input'
import { create } from '../store/slices/logs'

const LOG_INPUT_MIN_LENGTH = 10;
const PLACE_HOLDER = "Todays Milestone?"

function LogInput() {
	const dispatch = useDispatch()
	const logValue = useSelector(state => state.logInput.value)

	const handleChange = (event) => dispatch(update(event.target.value))

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(create(logValue))
		dispatch(reset())
	}


	return (
		<Box>
			<div>
				<form id='logForm'
							onSubmit={handleSubmit}
							className='flex flex-row flex-wrap'
				>
					<Input 	id='logInput'
								 	width={'15rem'}
									className='mr-1 mb-2 flex-grow'
									type='text'
									placeholder={PLACE_HOLDER}
									isRequired
									minLength={LOG_INPUT_MIN_LENGTH}
									onChange={handleChange}
									value={logValue}
					/>
					<Button type='submit'
									className='mb-2'>
						Add
					</Button>
				</form>
			</div>
		</Box>
	)
}

export default LogInput;
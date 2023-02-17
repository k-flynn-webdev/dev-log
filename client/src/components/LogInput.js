import * as React from 'react'
import { useState } from 'react'
import { Input, Box, Button } from '@chakra-ui/react'

import { useSelector, useDispatch } from 'react-redux'
import { update } from '../store/slices/logInput'

// todo: Make these a function that randomises and encourages
const PLACE_HOLDER = "Todays Milestone?"
const LOG_INPUT_MIN_LENGTH = 10;

function LogInput() {
 	const value = useSelector(state => state.logInput.value)
	const dispatch = useDispatch()

 const handleChange = (event) => dispatch(update(event.target.value));
  const handleSubmit = (event) => {
  	event.preventDefault();
  	console.log('user submitted', value)
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
									className='mr-1 mb-2'
									type='text'
									placeholder={PLACE_HOLDER}
									isRequired
									minLength={LOG_INPUT_MIN_LENGTH}
									onChange={handleChange}
									value={value}
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
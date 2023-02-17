import * as React from 'react'
import {Input, Card, Button, Hide} from '@chakra-ui/react';

import LogInputLength from './LogInputLength';

import { useSelector, useDispatch } from 'react-redux'
import { reset, update } from '../store/slices/log-input'
import { create } from '../store/slices/logs'

const LOG_INPUT_MIN_LENGTH = 10;
const PLACE_HOLDER = "Todays Milestone?"
const ADD = "Add"

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
		<Card className="log__input mb-3">
			<form id='logForm'
						onSubmit={handleSubmit}
						className='flex flex-row flex-wrap'
			>
				<div className='flex-grow m-1'>
					<Input 	id='logInput'
									width='100%'
									type='text'
									placeholder={PLACE_HOLDER}
									isRequired
									minLength={LOG_INPUT_MIN_LENGTH}
									onChange={handleChange}
									value={logValue}
					/>
					<LogInputLength />
				</div>

				<Button type='submit'
								colorScheme="green"
								isDisabled={logValue.length < LOG_INPUT_MIN_LENGTH }
								className='m-1 xs-hidden'>
					{ADD}
				</Button>

			</form>
		</Card>
	)
}

export default LogInput;
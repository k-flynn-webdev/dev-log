import * as React from 'react'
import { Input, Card, Button } from '@chakra-ui/react';

import LogInputLength from './LogInputLength';
import Tags from './Tags';

import { useSelector, useDispatch } from 'react-redux'
import { reset, update } from '../store/slices/log-input'
import { create } from '../store/slices/logs'
import { randomPlaceholder, isValidLogLength, LOG_INPUT_MIN_LENGTH, LOG_INPUT_MAX_LENGTH } from '../helpers/log-input';

import { ADD } from '../lang/en-gb';

function LogInput() {
	const dispatch = useDispatch()
	const logValue = useSelector(state => state.logInput.value)
	const logTags = useSelector(state => state.logInput.tags)
	const isValid = isValidLogLength(logValue.length)

	const handleChange = (event) => dispatch(update(event.target.value))

	const handleSubmit = (event) => {
		event.preventDefault()
		dispatch(create(logValue))
		dispatch(reset())
	}

	return (
		<Card className="log__input p-2 mb-3">
			<form id='logForm'
						onSubmit={handleSubmit}
						className='flex flex-row flex-wrap'
			>
				<div className='flex-grow'>
					<Input 	id='logInput'
									width='100%'
									type='text'
									placeholder={randomPlaceholder()}
									isRequired
									minLength={LOG_INPUT_MIN_LENGTH}
									maxLength={LOG_INPUT_MAX_LENGTH}
									onChange={handleChange}
									value={logValue}
					/>
					<LogInputLength />
				</div>

				<Button type="submit"
								colorScheme="green"
								isDisabled={!isValid}
								className="xs:hide ml-1">
					{ADD}
				</Button>

			</form>

			<Tags tags={logTags} />
		</Card>
	)
}

export default LogInput;
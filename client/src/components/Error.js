import * as React from 'react'
import { useSelector } from 'react-redux'
import { Alert, CloseButton } from '@chakra-ui/react';
import { hasError, getErrorMessage, clearError } from '../store/slices/error'
import { useDispatch } from 'react-redux';


function Error({ error }) {
	const dispatch = useDispatch()
	const hasErrorMessage = useSelector(hasError)
	const errorMessage = useSelector(getErrorMessage) || error?.message
	const handleOnClick = () => dispatch(clearError())

	return (
		<>
			{
				hasErrorMessage ?
				(<Alert status='error' className="mb-2">
					<div className='flex-grow'>
						<p>
							{errorMessage}
						</p>
					</div>
					<CloseButton
						onClick={handleOnClick}
					/>
				</Alert>) : null
			}
		</>
	)
}

export default Error;

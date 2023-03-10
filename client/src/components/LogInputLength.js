import * as React from 'react'
import { useSelector } from 'react-redux'
import { progressValue, isValidLogLength } from '../helpers/log-input';


function LogInputLength() {
	const logValueLength = useSelector(state => state.logInput.value).trim().length || 0
	const value = progressValue(logValueLength)
	const isValidClass = isValidLogLength(logValueLength) ? '' : 'invalid'

	return (
		<div
				className={`log__input-progress ${isValidClass}`}
				style={{ width: `${value}%` }}
		/>
	)
}

export default LogInputLength;


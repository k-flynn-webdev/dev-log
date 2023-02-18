import * as React from 'react'

import { useSelector } from 'react-redux'

const LOG_INPUT_MIN_LENGTH = 10;
const LOG_INPUT_MAX_LENGTH = 100;

const progressValue = (input) => {
	return (input / (LOG_INPUT_MAX_LENGTH)) * 100
}
const progressClass = (input) => {
	return `log__input-progress ${input < LOG_INPUT_MIN_LENGTH ? 'min' : '' }`
}

function LogInputLength() {
	const logValueLength = useSelector(state => state.logInput.value).length || 0
	const value = progressValue(logValueLength)
	const classNames = progressClass(logValueLength)

	return (
		<div
				className={classNames}
				style={{ width: `${value}%` }}
		/>
	)
}

export default LogInputLength;

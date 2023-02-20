import { LOG_PLACEHOLDERS } from '../lang/en-gb';

export const LOG_INPUT_MIN_LENGTH = 10;
export const LOG_INPUT_MAX_LENGTH = 100;

export const isValidLogLength = (input) => {
	return (input >= LOG_INPUT_MIN_LENGTH &&
			input < LOG_INPUT_MAX_LENGTH)
}

export const progressValue = (input) => {
	return (input / (LOG_INPUT_MAX_LENGTH)) * 100
}

export const randomPlaceholder = () => {
	const random = Math.floor((Math.random() * LOG_PLACEHOLDERS.length))
	return LOG_PLACEHOLDERS[random]
}

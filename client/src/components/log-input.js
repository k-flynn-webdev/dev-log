import { useState } from 'react';

// todo: randomize this to be more encouraging
const PLACE_HOLDER = "Todays Milestone?"

function LogInput({ className }) {
	const [log, setLog] = useState('');

	const onHandleChange = (input) => {
		setLog(input.target.value)
	};

	return (
		<div className={`log-input ${className}`}>
			<input
					className="input"
					type="text"
					placeholder={PLACE_HOLDER}
					value={log}
					onChange={onHandleChange}
			/>
		</div>
	);
}

export default LogInput;
import * as React from 'react'
import Tags from './Tags';

import { DATE_MONTHS } from '../lang/en-gb';

const getDateShort = (input) => {
	if (!input) return ''

	const dateObj = new Date(input)
	const AM_PM = dateObj.getHours() < 13 ? 'AM' : 'PM'
	return `${dateObj.getDate()} ${DATE_MONTHS[dateObj.getMonth()]} ${AM_PM}`
}

function Log({ log }) {

	return (
			<div
					className="logs__log"
					title={log.value}>
				<div>
					<div className="logs__log-text">
						<p>{ log.value }</p>
					</div>

					<div className="logs__log-tags">
						<Tags tags={log.tags} />
					</div>

					<div className="logs__log-date">
						{ getDateShort(log.created_at) }
					</div>

					<div className="logs__log-menu">
						<button>
							...
						</button>
					</div>

				</div>
			</div>
	)
}

export default Log;
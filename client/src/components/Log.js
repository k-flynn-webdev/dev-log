import * as React from 'react'
import Tags from './Tags';

import { DATE_MONTHS, TIME_AM, TIME_PM } from '../lang/en-gb';

const getDateShort = (input) => {
	if (!input) return ''

	const dateObj = new Date(input)
	const AM_PM = dateObj.getHours() < 13 ? TIME_AM : TIME_PM
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

					<div className="logs__log-date" title={log.created_at}>
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
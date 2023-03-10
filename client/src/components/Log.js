import * as React from 'react'
import { Card, CardBody } from '@chakra-ui/react'
import Tags from './Tags';

function Log({ log }) {

	return (
			<Card
					size="sm"
					className="log__card mb-2"
					title={log.value}>
				<CardBody>
					<div className="log__card-text">
						<p>{ log.value }</p>
					</div>

					{ log?.tags?.length ?
						(<Tags tags={log.tags} />) :
						null
					}

				</CardBody>
			</Card>
	)
}

export default Log;
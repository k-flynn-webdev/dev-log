import * as React from 'react'
import { Card, CardBody } from '@chakra-ui/react'
import Tags from './Tags';

function Log({ value }) {
	return (
			<Card
					size="sm"
					className="log__card mb-2"
					title={value.value}>
				<CardBody>
					<div className="log__card-text">
						<p>{ value.value }</p>
					</div>

					<Tags tags={value.tags} />
				</CardBody>
			</Card>
	)
}

export default Log;
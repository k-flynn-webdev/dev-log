import * as React from 'react'
import { Card, CardBody } from '@chakra-ui/react'

function Log({ value }) {
	return (
			<Card
					size="sm"
					className="log__card mb-3">
				<CardBody>
					<div>
						<p>{ value.value }</p>
					</div>
				</CardBody>
			</Card>
	)
}

export default Log;
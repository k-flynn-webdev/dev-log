import * as React from 'react'
import { Card, CardBody } from '@chakra-ui/react'

function Log({ value }) {
	return (
			<Card
					className="mb-3">
				<CardBody>
					<div>
						<p>{ value.value }</p>
					</div>
				</CardBody>
			</Card>
	)
}

export default Log;
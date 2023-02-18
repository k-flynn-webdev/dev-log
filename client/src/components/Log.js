import * as React from 'react'
import { Card, CardBody } from '@chakra-ui/react'
import LogTags from './LogTags';

function Log({ value }) {
	return (
			<Card
					size="sm"
					className="log__card mb-3">
				<CardBody>
					<div>
						<p>{ value.value }</p>
					</div>

					<LogTags tags={value.tags} />
				</CardBody>
			</Card>
	)
}

export default Log;
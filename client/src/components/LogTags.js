import * as React from 'react'
import { Tag } from '@chakra-ui/react';


function LogTags({ tags }) {
	const tagsList = tags ? tags.map((item) => (
			<Tag
					key={item.value}
					variant="solid"
					className="m-1">
				{item.value}
			</Tag>
	)) : ""

	return (
		<div className="log__tags">
			{tagsList}
		</div>
	)
}

export default LogTags;
import * as React from 'react'
import { Tag } from '@chakra-ui/react';

const getTagType = (tag) => (tag.type.toLowerCase())
const getTagValue = (tag) => (tag.value.toLowerCase())

function Tags({ tags }) {
	const tagsList = tags ? tags.map((item) => (
			<Tag
					key={getTagValue(item)}
					variant="solid"
					className="log__tag mr-2"
					title={`tag: ${getTagType(item)} - ${getTagValue(item)}`}>
				{getTagValue(item)}
			</Tag>
	)) : ""

	return (
		<div className={`log__tags ${tags.length ? 'mt-2' : ''}`}>
			{tagsList}
		</div>
	)
}

export default Tags;
